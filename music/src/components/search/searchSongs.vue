<template>
  <div class="searchSongs">
    <router-link class="song" 
    tag="li"
    v-for="(item, index) in songList"
    :to="{name: 'player', query: {id: item.id, index: index, list: songList}}">
      <div class="song-info">
        <div class="song-name">{{item.name}}</div>
        <div class="artist">
          <span v-for="(art, i) in item.artists">{{ i > 0 ? '/' : ''}}{{art.name}}</span> -
          <span>{{item.album.name}}</span>
        </div>
      </div>
      <div class="icon">
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
      songList: []
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
          type: 1
        },
        this.init
      );
    },
    init(res) {
      res ? (this.songList = res.data.result.songs) : "";
      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      })
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
.searchSongs {
  .song {
    display: flex;
    border-bottom: 0.1rem solid #f1f1f1;
    padding: 1.2rem;
  }
  .song:active {
    background-color: #efefef;
  }
  .song-info {
    width: 31rem;
    padding-right: 2rem;
  }
  .song-name {
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    width: 2.2rem;
    display: flex;
    align-items: center;
  }
  .icon > img {
    width: 100%;
  }
  .artist {
    font-size: 1.2rem;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>