<template>
  <div class="poster-container">
    <div :class="{
      'bar': true,
      'bar-active': animation
    }"><img src="@/assets/images/player/bar.png" alt=""></div>
    <div class="poster-wrapper">
      <div :class="{
        'poster-content': true,
        'rotateZ': true,
        'paused': !animation
      }"
      :style="{
            backgroundImage: `url(${pan})`
        }">
        <div class="poster">
          <img :src="`${$props.info.al && $props.info.al.picUrl}?param=200y200`" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pan from "@/assets/images/player/pan.png";
export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      pan: pan,
      animation: false,
    };
  },
  computed: {
    isPlay() {
      return this.$store.state.play;
    }
  },
  watch: {
    isPlay(status) {
      this.animation = status;
    }
  }
};
</script>

<style lang="less">
.poster-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, .2);
  .poster-wrapper {
      padding: .6rem;
      background-color: rgba(255, 255, 255, .06);
      position: relative;
    left: 50%;
    top: 45%;
    width: 26rem;
    height: 26rem;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 50%;
  }
  .bar {
    position: absolute;
    top: 11rem;
    width: 10.6rem;
    left: 60%;
    z-index: 6;
    transform-origin: 1rem 1rem;
    transform: translateX(-50%) rotateZ(-2.5deg);
    transition: all .5s ease-in-out;
  }
  .bar-active {
    transform: translateX(-50%) rotateZ(23deg);
    transition: all .5s ease-in-out;
  }
  .poster-content {
    background-size: 100% 100%;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  .poster {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 15.9rem;
    height: 15.9rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .rotateZ {
    animation: rotateZ 15s linear infinite;
  }
  .paused {
    animation-play-state: paused;
  }
}
@keyframes rotateZ {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>