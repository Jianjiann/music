<template>
  <div class="searchArtists">
    <router-link
      v-for="art in artists"
      tag="li"
      :to="{name: 'songlistPage', query: {id: art.id, path: 'artistSong'}}"
      class="artist"
    >
      <div class="phto">
        <img src="@/assets/images/lazy.jpg" alt srcset />
        <div class="art-phto" :style="{backgroundImage: `url(${art.img1v1Url}?param=90y90)`}"></div>
      </div>
      <div class="art-name">{{art.name}}</div>
      <div class="play-icon">
        <img src="@/assets/images/playlist-icon.png" alt />
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
      artists: []
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
          type: 100
        },
        this.init
      );
    },
    init(res) {
      res ? (this.artists = res.data.result.artists) : "";
      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      });
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
.searchArtists {
  .artist {
    display: flex;
    box-sizing: border-box;
    padding: 0.7rem 1.2rem;
    border-bottom: 1px solid #f1f1f1;
  }
  .phto {
    position: relative;
    width: 5rem;
    height: 5rem;
  }
  .art-phto {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 66;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .art-name {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    width: 26rem;
    padding-left: 1.2rem;
  }
  .play-icon {
    display: flex;
    align-items: center;
    width: 2.2rem;
  }
}
</style>