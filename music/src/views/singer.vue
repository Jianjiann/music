<template>
  <div class="singer" v-if="show">
    <div class="area-options">
      <span
        v-for="(item, i) in singerRegion.type"
        :class="{
                    'option': true,
                    'active-option': activeClass[i]
                }"
        @click="toggle($event, i)"
      >{{item.tag}}</span>
    </div>
    <tags :lists="singerRegion.children" :category="category" :to="to" @listen="getSingerlistType"></tags>
    <div class="playlistScroll">
    <scroll @getScroll="getScroll">
      <router-view @getLetter="getLetter" :singerlistType="singerlistType"></router-view>
    </scroll>
    </div>
    <navRight :letter="letter" :scroll="scroll" :activeLetter="activeLetter"></navRight>
  </div>
</template>
<script>
import getData from "@/api/index.js";
import singerRegion from "@/utils/singerRegion.js";
import tags from "@/components/tags.vue";
import navRight from "@/components/singer/singerNavRight.vue";
import scroll from '@/components/scroll.vue';
export default {
  data() {
    return {
      show: false,
      category: -1,
      to: "singerlist",
      singerRegion: singerRegion,
      activeClass: [true],
      activeLetter: [true],
      singerlistType: "推荐歌手",
      letter: null,
      scroll: null,
      listArr: []
    };
  },
  methods: {
    start(res) {
      this.$nextTick(() => {
        this.show = true;
        this.$store.commit("changeLoadingState", false);
      })
    },
    getLetter(letter) {
      this.letter = letter;
      this.$nextTick(() => {
        this.scrollEvents(letter);
      })
    },
    getScroll(scroll) {
      this.scroll = scroll;
    },
    initScroll() {
      this.$nextTick(() => {
        this.scroll.scrollTo(0, 0);
      })
    },
    scrollEvents(letter) {
      this.scroll.on('scroll', (e) => {
        letter.forEach((el,i) => {
          let top = el.offsetTop,
              y = e.y * -1;
          if( y <= top ) {
            if( i == 0 ) {
              this.activeLetter = this.newArray(0);
              return;
            }
            if( y <= top && y > letter[i - 1].offsetTop ) {
              this.activeLetter = this.newArray(i);
              return;
            }
          }
        });
      })
    },
    newArray(i) {
      let arr = [];
      arr[i] = true;
      return arr;
    },
    toggle(e, index) {
      // e = e || window.event;
      this.activeClass = this.newArray(index);
      // this.category = index - 1;
      // e.stopPropagation();
      // e.cancelBubble = true;
      if(typeof this.listArr[index] == 'object') {
      this.listArr[index].show 
      ? (this.category = null, this.listArr[index].show = false)
      : (this.category = index - 1, this.listArr[index].show = true)
    } else {
      let arr = [];
        arr[index] = {
        show: true
      }
      this.listArr = arr;
      this.category = index - 1;
    }
    },
    getSingerlistType(item) {
      item == "default"
        ? (this.singerlistType = "推荐歌手")
        : (this.singerlistType = item);
        this.initScroll();
        // 点击标签隐藏列表
      this.category = null;
      this.listArr = [];
    },
  },
  created() {
     this.$store.commit("changeLoadingState", true);
    getData("artists", {
        limit: 70
      }, this.start);
  },
  // keep-alive组件激活时调用
  activated() {
    this.show && this.$store.commit("changeLoadingState", false);
  },
  components: {
    tags,
    scroll,
    navRight
  }
};
</script>

<style lang="less">
.singer {
  padding-top: 4rem;
  background-color: #fff;
  .area-options {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 66;
    display: flex;
    justify-content: space-around;
    padding: 0.9rem 0.7rem;
    box-sizing: border-box;
    border-bottom: 1px solid #0190ff;
  }
  .active-option {
    color: #0190ff;
  }
  .scroll-wrapper {
    position: absolute;
    top: 4rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .playlistScroll {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>