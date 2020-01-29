<template>
  <div class="lyrics" ref="container">
    <scroll @getScroll="getScroll" v-if="lrc">
      <ul class="lyrics-content" ref="content" @touchstart="touchstart" @touchend="touchend">
        <li
          ref="lyrics"
          v-for="(item, index) in lrc"
          :key="item.time + index"
          :class="{
          'lrc-item': true,
          'lrc-item-active': activeClass[index]
        }"
        >
          {{item.text}}
          <div v-if="item.cText">{{item.cText}}</div>
        </li>
      </ul>
    </scroll>
    <div class="pureMusic" v-else>纯音乐，请欣赏</div>
  </div>
</template>

<script>
import scroll from "@/components/scroll.vue";
import myAxios from "@/api/index.js";
export default {
  components: {
    scroll
  },
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      lrc: [],
      activeClass: [true],
      scroll: null,
      lrcScroll: true,
      timer: null,
      timer2: null,
      scrollTime: 200
    };
  },
  methods: {
    init(res) {
      if(res) {
        console.log(res);
      res.data.lrc ? this.mergeLrc(res): this.lrc = null;
      }
      console.log('init')
      this.scroll.scrollTo(0, 0, this.scrollTime);
      this.scroll && this.scroll.refresh();
      // 给歌词容器加个 padding
      this.$refs.content.style.padding = `${this.$refs.container.clientHeight / 2}px 0`;

    },
    // 如果歌曲有中文翻译，添加中文翻译
    mergeLrc(res) {
      let lrc = this.parseLyric(res.data.lrc.lyric),
        chineseLrc = this.parseLyric(res.data.tlyric.lyric);
      if (chineseLrc) {
        let len1 = lrc.length,
          len2 = chineseLrc.length;
        for (var i = 0; i < len1; i++) {
          for (var j = 0; j < len2; j++) {
            if (lrc[i].time == chineseLrc[j].time) {
              lrc[i].cText = chineseLrc[j].text;
              break;
            }
          }
        }
      }
      this.lrc = lrc;
    },
    getData(id) {
      id &&
        myAxios(
          "lyric",
          {
            id: id
          },
          this.init
        );
    },
    // 获取滚动条对象
    getScroll(scroll) {
      this.scroll = scroll;
    },
    // 解析歌词，将解析好的每一句歌词放在 this.lrc 里，this.lrc 的每一位为一个对象，对象有 time(何时显示) 和 text(歌词内容)两个属性
    parseLyric(lrc) {
      if (lrc) {
        let reg = /\[[^\]]+\]/g,
          arr = lrc.split("\n"),
          result = [];
        arr instanceof Array && arr.forEach((item, index) => {
            let obj = {},
              time;
            if (item.match(reg) instanceof Array) {
              time =
                item.match(reg).length > 1
                  ? item.match(reg)[1]
                  : item.match(reg)[0];
            }
            obj.text = item.replace(reg, "");
            obj.time = this.toNumber(time);
            obj.text && result.push(obj);
          });
          return result;
      }
    },
    // 将歌词每一句的显示时间( [02:00.000]形式 )变成数字( 120.000形式 )
    toNumber(time) {
      if (/\[[^\]]+\]/.test(time)) {
        let str = time.slice(1, time.length - 2),
          arr = str.split(":"),
          m = parseFloat(arr[0]) * 60,
          s = parseFloat(arr[1]) + m;
        return s;
      }
    },
    // 控制歌词显示的进度
    progress(curT) {
      let lrc = this.lrc,
        len = lrc.length;
      for (var i = 0; i < len; i++) {
        if (
          (curT > lrc[i].time && lrc[i + 1] && curT < lrc[i + 1].time) ||
          (curT > lrc[i].time && !lrc[i + 1])
        ) {
          this.activeClass = this.newArray(i);
          this.scrollTo(i);
          break;
        } else {
          this.activeClass = this.newArray(0);
        }
      }
    },
    // 拖动歌词时暂停自动滚动歌词，3s 后恢复
    touchstart() {
      clearTimeout(this.timer);
      this.lrcScroll = false;
    },
    touchend() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.lrcScroll = true;
      }, 3000);
    },
    scrollTo(index) {
      let lyrics = this.$refs.lyrics,
        height = this.$refs.container.clientHeight,
        top = lyrics[index].offsetTop,
        to = top - height / 2;
      if (this.lrcScroll) {
        this.scroll.scrollTo(0, -to, this.scrollTime);
      }
    },
    newArray(index) {
      let arr = [];
      arr[index] = true;
      return arr;
    }
  },
  computed: {
    idChange() {
      return this.$props.info.id;
    },
    getCurrentTime() {
      return this.$store.state.currentTime;
    }
  },
  watch: {
    idChange(id) {
      id && this.getData(id);
    },
    // 监听歌曲当前播放时间，自动滚动歌词
    getCurrentTime(currentTime) {
      this.progress(currentTime);
    }
  },
  created() {
    this.$props.info && this.getData(this.$props.info.id);
  },
  // 每次切换回这个组件时更新滚动条插件并自动定位到当前显示歌词
  activated() {
    clearTimeout(this.timer2);
    this.scrollTime = 0;
    this.lrcScroll = true;
    this.scroll && this.scroll.refresh();
    this.timer2 = setTimeout(() => {
      this.scrollTime = 200;
    });
  }
};
</script>

<style lang="less">
.lyrics {
  position: fixed;
  top: 6rem;
  left: 0;
  right: 0;
  bottom: 12.5rem;
  box-sizing: border-box;
  padding: 0 0.8rem;
  .lyrics-content {
    text-align: center;
  }
  .lrc-item {
    font-size: 1.4rem;
    color: #fff;
    padding: 0.6rem 0;
    line-height: 2rem;
  }
  .lrc-item-active {
    color: #0190ff;
  }
  .pureMusic {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    color: #fff;
    font-size: 1.4rem;
    line-height: 2rem;
  }
}
</style>