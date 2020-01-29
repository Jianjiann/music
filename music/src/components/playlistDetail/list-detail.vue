<template>
  <div class="list-detail">
    <div class="blur" :style="{
      backgroundImage: `url(${$props.datas.coverImgUrl}?param=200y200)`
    }"></div>
    <div class="title">
      <img src="@/assets/images/goBack.png" alt class="goBack" @click="goBack" />
      <span class="title-name">歌单</span>
    </div>
    <div class="list-detail-content">
      <div class="image-wrapper">
        <div class="filter"></div>
        <div class="playCount" v-if="$props.datas.playCount">
          <img class="headset" src="@/assets/images/headset.png" alt />
          {{playCount($props.datas.playCount)}}
        </div>
        <img :src="`${$props.datas.coverImgUrl}?param=200y200`" alt />
      </div>
      <div class="list-info-box">
        <div class="list-info-title">{{$props.datas.name}}</div>
        <div class="scroll-wrapper">
          <scroll>
            <div class="list-info">{{$props.datas.description}}</div>
          </scroll>
        </div>
      </div>
    </div>
    <div class="playAll" @click="playAll"><img src="@/assets/images/playall.png" alt=""></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import scroll from "@/components/scroll.vue";
export default {
  props: {
    name: {
      type: String
    },
    datas: {
      type: Object
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    playCount(count) {
      return Math.floor(count * 0.0001) >= 1
        ? Math.floor(count * 0.0001) + "万"
        : count;
    },
    playAll() {
      this.$emit('playAll');
    }
  },
  components: {
    scroll
  }
};
</script>

<style lang="less">
.list-detail {
  position: relative;
  width: 37.5rem;
  height: 22.43rem;
  padding-bottom: .2rem;
  overflow: hidden;
  .title {
    position: relative;
    text-align: center;
    padding: 0.6rem 0;
    background: hsla(0, 0%, 100%, 0.2);
  }
  .title-name {
    font-size: 1.8rem;
    color: #0190ff;
    text-shadow: 0 0 0.2rem #0190ff;
  }
  .goBack {
    position: absolute;
    width: 2.1rem;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .blur {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #0190ff;
    filter: blur(3.5rem);
  }
  .list-detail-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 1.2rem;
  }
  .image-wrapper {
    position: relative;
    width: 32%;
  }
  .image-wrapper img {
    width: 100%;
  }
  .list-info-box {
    background-color: rgba(255,255,255, .6);
    box-sizing: border-box;
    padding: .7rem;
    border-radius: .7rem;
    width: 65%;
  }
  .scroll-wrapper {
    height: 6rem;
  }
  .list-info-title {
    font-size: 1.7rem;
    line-height: 2.2rem;
    font-weight: bold;
    color: #0190ff;
     text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-info {
    width: 100%;
    box-sizing: border-box;
    font-size: 1.4rem;
    line-height: 2rem;
    color: #333;
  }
  .playAll {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 13rem;
    transform: translate(-50%, -0.5rem);
  }
  .bottom {
    position: absolute;
    width: 100%;
    height: 5rem;
    border-radius: 50%;
    background-color: #fff;
    bottom: 0;
    z-index: -1;
    transform: translateY(51%);
  }
}
</style>