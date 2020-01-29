<template>
  <div class="playlist" v-if="show">
    <div class="select">
      <span
        :class="{item: true, 'active-item':activeItem[0] }"
        @click="showList($event, 0)"
      >{{playlist.all.name}}</span>
      <span
        :class="{item: true, 'active-item':activeItem[Number(i) + 1] }"
        :data-category="i"
        @click.stop="showList(Number(i) + 1)"
        v-for="(tag, i) in playlist.categories"
      >{{tag}}</span>
    </div>
    <tags :lists="this.playlist.sub" :category="category" :to="to" @listen="getPlaylistType"></tags>
    <div class="playlistScroll">
      <scroll>
        <router-view :playListType="playListType" :twoColumns="true"></router-view>
      </scroll>
    </div>
  </div>
</template>

<script>
import getData from "@/api/index.js";
import tags from "@/components/tags.vue";
import scroll from "@/components/scroll.vue";
export default {
  data() {
    return {
      category: null,
      show: false,
      showTags: false,
      activeItem: [true],
      sub: [],
      to: "content",
      playListType: "全部", // 后端接口参数
      scroll: null,
      listArr: [] // 控制列表显示隐藏
    };
  },
  methods: {
    start(res) {
      if (typeof res == "object") {
        this.playlist = res.data;
        this.$nextTick(() => {
          this.show = true;
        });
      }
    },
    newArray(index) {
      let arr = [];
      arr[index] = true;
      return arr;
    },
    showList(index) {
      // 文字颜色
      this.activeItem = this.newArray(index);
      // 两次点击同一个按钮隐藏列表
      if (typeof this.listArr[index] == "object") {
        this.listArr[index].show
          ? ((this.category = null), (this.listArr[index].show = false))
          : ((this.category = index - 1), (this.listArr[index].show = true));
      } else {
        let arr = [];
        arr[index] = {
          show: true
        };
        this.listArr = arr;
        this.category = index - 1;
      }
    },
    getPlaylistType(item) {
      item == "default"
        ? (this.playListType = "全部")
        : (this.playListType = item.name);

      // 点击标签隐藏列表
      this.category = null;
      this.listArr = [];
    }
  },
  created() {
    this.$store.commit("changeLoadingState", true);
  },
  mounted() {
    getData("catlist", null, this.start);
  },
  // keep-alive组件激活时调用
  activated() {
    this.show && this.$store.commit("changeLoadingState", false);
  },
  components: {
    tags,
    scroll
  }
};
</script>

<style lang="less">
.playlist {
  padding-top: 4rem;
  background-color: #fff;
  .select {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0.9rem 0.7rem;
    color: #666;
    border-bottom: 1px solid #0190ff;
  }
  .item {
    font-size: 1.6rem;
  }
  .active-item {
    color: #0190ff;
  }
  .playlistScroll {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>