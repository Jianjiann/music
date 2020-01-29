<template>
  <!-- 播放器页面 -->
  <div class="player-container" @touchstart.stop="() =>{}">
    <img :src="info.al ? `${info.al.picUrl}?param=400y400`: defaultBg" alt class="blur" />
    <songInfo @click.stop="()=>{}" :info="info"></songInfo>
      <div class="middleComp" @click="toggleComp">
        <keep-alive>
          <component :is="isPoster? 'poster': 'lyrics'" :info="info"></component>
        </keep-alive>
      </div>
    <tools @click.stop="()=>{}" :songId="info && info.id" @onchange="onchange"></tools>
  </div>
</template>

<script>
import myAxios from "@/api/index.js";
import songInfo from "@/components/player/singInfo.vue";
import poster from "@/components/player/poster.vue";
import lyrics from "@/components/player/lyrics.vue";
import tools from "@/components/player/tools.vue";

// 图片
import defaultBg from "@/assets/images/player/pan.png";
export default {
  components: {
    songInfo,
    poster,
    lyrics,
    tools
  },
  data() {
    return {
      isPoster: true,
      info: {},
      index: null, // 当前歌曲在列表中的索引
      list: null, // 传入的播放列表
      playList: [], // 与 list 相映射，主要为了处理随机播放
      randomPlay_lock: true,
      defaultBg: defaultBg,
      timer: null,
      lastId: null
    };
  },
  computed: {
    playOrderChange() {
      return this.$store.state.playOrderIndex;
    },
    songIndexChange() {
      return this.$store.state.songIndex;
    },
    closeIndexChange() {
      return this.$store.state.closeIndex;
    },
    listChange() {
      return this.$store.state.list;
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.id) {
        this.getList();
        this.getData(to.query.id);
      }
      
    },
    playOrderChange(index) {
      this.playMode();
    },
    list(list) {
      if (list.length == 0 && this.$route.name == "player") {
        this.info = {};
        this.$store.commit("showTodoList", false);
        this.$router.go(-1);
      }
      let index = this.$store.state.playOrderIndex;
      // 数据同步到公共状态中
      this.$store.commit("changeList", list);
      // this.list 改变时根据播放模式改变 this.playList
      this.playMode();
    },
    songIndexChange(index) {
      if (typeof index == "number") {
        this.playOrderChange == 1 ? index = this.arrMapping(this.playList, this.list, index) : "";
        this.index = index;
        let id = this.playList[index] && this.playList[index].id;
        this.getData(id);
      }
    },
    index(index) {
      this.playOrderChange != 1 && this.$store.commit("changeSongIndex", index);
    },
    info(info) {
      this.$store.commit("setSongInfo", info);
    },
    // 根据索引删除播放列表中的歌曲
    closeIndexChange(index) {
      if (typeof index == "number") { 
        let tempList = this.list.slice();
        this.list.splice(index, 1);
        // 删除之后同步歌曲列表
        this.$store.commit("changeList", this.list);
        if(this.playOrderChange == 1) { // 如果当前为随机播放模式
          // 随机播放歌曲列表的索引必须和播放列表的索引所对应
          let tempIndex = this.arrMapping(this.playList, tempList, index),
              listNowIndex = this.arrMapping(this.list, this.playList, this.index); 
          this.playList.splice(tempIndex, 1);
          if( index < listNowIndex + 1 ) {
            this.$store.commit("changeSongIndex", listNowIndex);
          }
          tempIndex < this.index && --this.index;
          if(tempIndex == this.index) {
            this.index = this.loopPlay(0);
            let i = this.arrMapping(this.list, this.playList, this.index);
            this.$store.commit("changeSongIndex", i);
            this.onchange(0);
          }
        } else {
          // 非随机播放模式
          // 如果删除的歌曲在播放歌曲之前，this.index 减一位。
          this.playList.splice(index, 1);
          index < this.index && --this.index;
          // 如果删除的是当前播放歌曲则自动切换到下一首
          if(index == this.index) {
            this.onchange(0);
            this.$store.commit("changeSongIndex", index);
          }
        }
      }
    },
    listChange(list) {
      this.list = list;
    }
  },
  methods: {
    init(res) {
      clearTimeout(this.timer);
      if (res.data.songs[0]) {
        let info = res.data.songs[0];
          this.info = {};
          this.timer = setTimeout(() => {
            this.info = info;
            this.playMode();
          }, 30)
      }
    },
    getData(id) {
      // 当 id 不等于上一次的id 时，获取歌曲信息
      if(id && id != this.lastId) {
        myAxios("songDetail", { ids: id }, this.init);
        this.lastId = id;
      }
    },
    toggleComp() {
      this.isPoster = !this.isPoster;
    },
    // 从当前路由中获取播放列表和歌曲在列表中的索引
    getList() {
      let query = this.$route.query;
      if (typeof parseInt(query.index) == 'number' && query.list) {
        this.index = this.$route.query.index;
        this.list = this.$route.query.list;
        this.$store.commit("changeList", this.list);

        // this.playOrderChange == 1 为随机播放下
        this.playOrderChange == 1 ? this.randomPlay_lock = true : '';
        this.playMode();
        this.playOrderChange == 1 && this.$store.commit("changeSongIndex", this.arrMapping(this.list, this.playList, this.index));
      }
    },
    // 调整随机播放模式下实际播放列表（this.playList）与当前播放任务列表（this.list）索引对不上的问题
    arrMapping(arr1, arr2, index) {
      let result = null;
      arr1.forEach((ele, i) => {
        ele.id == arr2[index].id ? (result = i) : "";
      });
      return result;
    },
    // this.$store.state.playOrderIndex 的值  0: 顺序播放, 1: 随机播放，2: 单曲循环
    playMode() {
      switch (this.$store.state.playOrderIndex) {
        case 0:
          this.orderPlay();
          break;
        case 1:
          this.randomPlay();
          break;
        case 2:
          this.singleCyclePlay();
          break;
      }
    },
    loopPlay: function(dir) {
      // 列表循环
      if (this.index + dir > this.playList.length - 1) {
        return 0;
      } else if (this.index + dir < 0) {
        return this.playList.length - 1;
      } else {
        return this.index + dir;
      }
    },
    // 歌曲切换
    onchange(dir) {
      // dir 的值: -1 为上一首，1 为下一首，0 为 索引不变
      let index = this.loopPlay(dir),
        id = this.playList[index] ? this.playList[index].id : null;
      if (id) {
        this.getData(id);
        this.index = index;
        this.$store.commit("changeSongIndex", this.arrMapping(this.list, this.playList, this.index));
      }
    },
    // 洗牌算法（数组乱序）
    shuffle(arr) {
      arr = arr.slice();

      let len = arr.length;
      for (let i = 0; i < len; i++) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },
    // 顺序播放
    orderPlay() {
      this.playList = this.list.slice();
      this.randomPlay_lock = true;
      this.$store.state.songIndex !== null ? this.index = this.arrMapping(this.playList, this.list, this.$store.state.songIndex):"";
      this.$store.commit("isSingleCyclePlay", false);
    },
    // 随机播放
    randomPlay() {
      if (this.randomPlay_lock) {
        this.playList = this.shuffle(this.list);
        this.randomPlay_lock = false;
        this.index = this.arrMapping(this.playList, this.list, this.index);
        this.$store.commit("isSingleCyclePlay", false);
      }
    },
    // 单曲循环播放
    singleCyclePlay() {
      this.playList = this.list.slice();
      this.randomPlay_lock = true;
      this.$store.state.songIndex !== null ? this.index = this.arrMapping(this.playList, this.list, this.$store.state.songIndex):"";
      this.$store.commit("isSingleCyclePlay", true);
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getList();
      this.getData(this.$route.query.id);
    }
  }
};
</script>

<style lang="less">
.player-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 77777;
  background: #3f3f3f;
  .blur {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 100%;
    z-index: -1;
    filter: blur(60px);
    animation: fadeIn 1s ease-in-out;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>