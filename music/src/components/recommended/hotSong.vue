<template>
<!-- 推荐热歌 -->
  <div class="hotSong">
    <router-link class="hotSong-item" 
    tag="li"
    v-for="(item, index) in lists" 
    :data-id="item.id" 
    :to="{name: 'player', query: {id: item.id, index: index, list: lists}}"
    :key="item.id">
      <div class="hotSong-picture">
        <img :src="`${item.song.album.picUrl}?param=90y90`" alt />
      </div>
      <div class="songInfo">
        <div class="song-name">{{item.name}}</div>
        <div class="song-auther"><span v-for="(art, i) in item.song.artists">{{i > 0 ? '/': ''}}{{art.name}}</span>-{{item.song.album.name}}</div>
      </div>
      <div class="play-icon">
        <img src="@/assets/images/playlist-icon.png" alt />
      </div>
    </router-link>
  </div>
</template>

<script>
import getData from "@/api/index.js";
export default {
  data() {
    return {
      lists: null
    };
  },
  props: {
    id: {
      typeof: Number
    }
  },
  methods: {
      start(res) {
      typeof res == "object" ? (this.lists = res.data.result) : "";
      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      })
    },
  },
  created() {
    getData("newsong", null, this.start);
  }
};
</script>

<style lang="less">
.hotSong {
    .hotSong-item {
        margin-top: .6rem;
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 0.4rem 1rem;
    }
    .songInfo {
        box-sizing: border-box;
        width: 28rem;
        padding: 0 2rem 0 1.2rem;
    }
    .song-name {
        margin-top: .3rem;
        font-size: 1.5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .song-auther {
        margin-top: .7rem;
        font-size: 1.1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
         color: #666;
        letter-spacing: .05rem;
    }
    .hotSong-picture {
        width: 5rem;
    }
    .play-icon {
        display: flex;
        align-items: center;
        width: 2rem;
    }
}
</style>