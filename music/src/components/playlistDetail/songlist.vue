<template>
  <div class="songlist">
    <scroll>
      <li class="song-item" 
      v-for="(item, index) in $props.songlist"
      @click.stop="toPlay(item.id, index)">
        <div class="hotSong-picture">
          <img :src="`${item.al.picUrl}?param=90y90`" alt />
        </div>
        <div class="songInfo">
          <div class="song-name">{{item.name}}</div>
          <div class="song-auther">{{item.ar[0].name}}-{{item.al.name}}</div>
        </div>
        <div class="play-icon">
          <img src="@/assets/images/playlist-icon.png" alt />
        </div>
      </li>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/scroll.vue";
export default {
  props: {
    songlist: {
      type: Array
    }
  },
  methods: {
    toPlay(id, index) {
      this.$router.push({name: 'player', query: {id: id, index: index, list: this.$props.songlist}})
    }
  },
  components: {
    scroll
  }
};
</script>

<style lang="less">
.songlist {
  position: absolute;
  top: 22.43rem;;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .top {
    width: 100%;
    border-radius: 50%;
    background-color: #fff;
  }
  .song-item {
    margin-top: 0.6rem;
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
    margin-top: 0.3rem;
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-auther {
    margin-top: 0.7rem;
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
    letter-spacing: 0.05rem;
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