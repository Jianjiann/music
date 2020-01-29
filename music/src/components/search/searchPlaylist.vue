<template>
  <div class="searchPlaylist">
    <router-link class="playlist" v-for="item in playlists"
    tag="li"
      :to="{name: 'songlistPage', query: {id: item.id}}">
      <div class="pic-box">
        <img src="@/assets/images/lazy.jpg" alt srcset />
        <div class="pic" :style="{backgroundImage: `url(${item.coverImgUrl}?param=90y90)`}"></div>
      </div>
      <div class="playlist-info">
        <div class="playlist-name">{{item.name}}</div>
        <div class="playlist-detail">
          <span class="trackCount">{{item.trackCount}}首 </span>
          <span class="creator">by{{item.creator.nickname}}，</span>
          <span class="playlist-playCount">播放{{playCount(item.playCount)}}次</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import myAxios from "@/api/index.js";
export default {
  props: {
    keyword: {
      type: String
    }
  },
  data() {
    return {
      playlists: []
    };
  },
  methods: {
    getData(keyword) {
      this.artists = [];
      this.$store.commit("changeLoadingState", true);
      myAxios(
        "search",
        {
          keywords: keyword,
          type: 1000
        },
        this.init
      );
    },
    init(res) {
      res ? (this.playlists = res.data.result.playlists) : "";
      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      })
    },
     playCount(count) {
      return Math.floor(count * 0.0001) >= 1
        ? Math.floor(count * 0.0001) + "万"
        : count;
    }
  },
  watch: {
    _keyword(value) {
      value && this.getData(value);
    }
  },
  computed: {
    _keyword() {
      return this.$props.keyword;
    }
  },
  created() {
    this.getData(this.$props.keyword);
  }
};
</script>

<style lang="less">
.searchPlaylist {
  .playlist {
    display: flex;
    align-items: center;
    padding: .7rem 1.2rem;
    border-bottom: 1px solid #eee;
  }
  .playlist-info {
      width: 29rem;
      padding-left: 1rem;
  }
  .pic-box {
    position: relative;
    width: 5rem;
    height: 5rem;
  }
  .pic {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 66;
  }
  .playlist-name {
      font-size: 1.5rem;
      color: #000;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .playlist-detail {
      margin-top: .3rem;
      font-size: 1.2rem;
      color: #666;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
