<template>
  <div class="miniPlayer" @click="toPlayPage">
    <div
      :class="{
          'miniPlayer-picture':true,
          'rotateZ': true,
          'paused': playState 
      }"
      :style="{
            backgroundImage: `url(${poster})`
        }"
    ></div>
    <div class="song-info">
      <div class="name">{{info.name}}</div>
      <div class="artists">
        <span v-for="(art, i) in info.ar">{{i > 0 ? '/': ''}}{{art && art.name}}</span>
        <span>{{info.al && '-' + info.al.name}}</span>
      </div>
    </div>
    <div class="play-button" @click.stop="isPlay">
      <img :src="playButton" alt />
    </div>
    <div class="menu" @click.stop="showTodoList">
      <img src="@/assets/images/miniPlayer/miniPlayer-menu.png" alt />
    </div>
  </div>
</template>
<script>
import play from "@/assets/images/miniPlayer/miniPlayer-play.png";
import pause from "@/assets/images/miniPlayer/miniPlayer-pause.png";
import posterBg from "@/assets/images/player/pan.png";
import cycle from "@/assets/images/player/cycle.png";
import random from "@/assets/images/player/random.png";
import singleCycle from "@/assets/images/player/singleCycle.png";
export default {
  data() {
    return {
      poster: posterBg,
      playButton: pause,
      info: {},
      playOrder: [cycle, random, singleCycle],
      playOrderIndex: 0,
      playState: true
    };
  },
  watch: {
    infoChange(info) {
      if(info) {
        this.info = info;
        this.poster = info.al && info.al.picUrl ? info.al.picUrl : posterBg;
      }
      
    },
    playStateChange(status) {
      this.playButton = status ? play : pause;
      this.playState = !status;
    }
  },
  computed: {
    infoChange() {
      return this.$store.state.songInfo;
    },
    playStateChange() {
      return this.$store.state.play;
    }
  },
  methods: {
    toPlayPage() {
      this.$router.push({ name: "player" });
    },
    isPlay() {
      this.playState ? this.play() : this.pause();
    },
    play() {
      if(this.info.al) {
        this.playButton = play;
        this.$store.commit("changePlayState", true);
        this.playState = false;
      }
    },
    pause() {
      if(this.info.al) {
        this.playButton = pause;
        this.$store.commit("changePlayState", false);
        this.playState = true;
      }
    },
    showTodoList() {
      this.$store.commit("showTodoList", true);
    }
  }
};
</script>

<style lang="less">
.miniPlayer {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  bottom: 0;
  height: 4.5rem;
  border-top: 1px solid #ddd;
  background-color: #fff;
  z-index: 66666;
  padding: 0 0.5rem;
  .miniPlayer-picture {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }
  .song-info {
    width: 23rem;
    padding: 0 1rem;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .name {
      font-size: 1.5rem;
      color: #222;
    }
    .artists {
      font-size: 1.3rem;
      color: #666;
    }
  }
  .play-button {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 1.3rem;
  }
  .menu {
    display: flex;
    align-items: center;
    width: 2rem;
  }
  .rotateZ {
    animation: rotateZ 15s linear infinite;
  }
  .paused {
    animation-play-state: paused;
  }
  @keyframes rotateZ {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
</style>