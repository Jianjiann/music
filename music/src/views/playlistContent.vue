<template>
  <div class="playlistContent">
    <router-link class="item"
         v-for="item in playlists"
         :style="{
             width: $props.twoColumns === true ? '48.8%': '32%'
         }"
         :to="{name: 'songlistPage', query: {id: item.id}}"
         >
      <div class="image-wrapper">
        <div class="filter"></div>
        <div class="playCount">
          <img class="headset" src="@/assets/images/headset.png" alt />
          {{playCount(item.playCount)}}
        </div>
        <img src="@/assets/images/lazy.jpg" alt />
        <div
          class="picture"
          :style="{
                    backgroundImage: `url(${item.picUrl || item.coverImgUrl}?param=200y200)`
            }"
        ></div>
      </div>
      <div class="detail">{{item.name}}</div>
    </router-link>
  </div>
</template>

<script>
import getData from "@/api/index.js";
export default {
  props: {
    playListType: {
      type: String
    },
    twoColumns: {
        type: Boolean
    }
  },
  data() {
    return {
      show: false,
      playlists: [],
      itemWidth: '32%'
    };
  },
  watch: {
    getType(value, oldValue) {
      this.$store.commit("changeLoadingState", true);
      this.updateLists(value);
    }
  },
  computed: {
    getType() {
      return this.$props.playListType;
    }
  },
  methods: {
    init(res) {
      res ? ((this.playlists = res.data.playlists), (this.show = true)) : "";
      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      })
    },
    updateLists(type) {
      getData(
        "playlist",
        {
          order: "hot",
          cat: type
        },
        this.init
      );
    },
    playCount(count) {
      return Math.floor(count * 0.0001) >= 1
        ? Math.floor(count * 0.0001) + "万"
        : count;
    }
  },
  created() {
    this.updateLists(this.$props.playListType);
  }
};
</script>

<style lang="less">
.playlistContent {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 1rem;
  background-color: #fff;
  .item {
      margin-top: 1rem;
  }
  .picture {
    position: absolute;
    top: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
  }
  .recommended-item {
    width: 32%;
    margin-top: 1rem;
  }
  .image-wrapper {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .image-wrapper img {
    width: 100%;
  }
  .detail {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    color: #000;
    line-height: 1.9rem;
    height: 3.8rem;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 0.6rem;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>