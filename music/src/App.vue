<template>
  <div id="app">
    <search></search>
    <navigation></navigation>
    <transition :name="slide">
      <keep-alive>
        <router-view class="container"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <keep-alive>
        <router-view name="player"></router-view>
      </keep-alive>
    </transition>
    <miniPlayer></miniPlayer>
    <todoList></todoList>
    <loading></loading>
  </div>
</template>

<script>
import "./assets/css/reset.css";
import axios from "axios";
import Vue from 'vue';
import scroll from '@/components/scroll.vue';
import navigation from "components/navigationBar.vue";
import search from "components/search/search.vue";
import miniPlayer from "components/miniPlayer.vue";
import loading from "@/components/loading.vue";
import todoList from "@/components/todoList.vue";
export default {
  name: "app",
  data() {
    return {
      slide: '',
      timer: null
    }
  },
  methods: {
    setRem() {
      let html = document.documentElement,
        rem = html.clientWidth / 37.5;
      html.style.fontSize = rem + "px";
    },
    preventDefault() {
      document.addEventListener('touchmove', e => {
        e = e || window.event;
        e.preventDefault();
        e.returnValue = false;
    }, {passive: false})
    }
  },
  watch: {
    $route(to, from) {
      if(to.name !== 'player' && from.name !== 'player') {
        clearTimeout(this.timer);
        to.meta.index > from.meta.index ? this.slide = "slide-left": this.slide = "slide-right";
        // 解决一个过渡 bug
        this.timer = setTimeout(() => {
          this.slide = '';
        }, 500)
      } 
    }
  },
  created() {
    this.preventDefault();
  },
  mounted() {
    this.setRem();
    window.addEventListener("resize", () => {
      this.setRem();
    });
  },
  components: {
    search,
    navigation,
    miniPlayer,
    scroll,
    loading,
    todoList
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-bottom: 4.5rem;
   .container {
      position: fixed;
      width: 100%;
      top: 8.76rem;
      bottom: 4.6rem;
      box-sizing: border-box;
      background-color: #fff;
   }

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 7;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(20, 20, 20, 0.6)),
      color-stop(25%, transparent),
      color-stop(75%, transparent),
      to(rgba(20, 20, 20, 0.6))
    );
    background: linear-gradient(
      180deg,
      rgba(20, 20, 20, 0.6) 0,
      transparent 25%,
      transparent 75%,
      rgba(20, 20, 20, 0.6)
    );
  }

  .playCount {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    display: flex;
    align-items: center;
    z-index: 10;
    font-size: 1.3rem;
    color: #fff;
    .headset {
      display: inline-block;
      width: 1.5rem;
      margin-right: 0.4rem;
    }
  }

// 过渡动画
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
      }
      .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
      }

      .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
      }

      .slide-left-enter {
        opacity: 0;
        transform: translate(100%, 0);
      }

      .slide-left-leave-active {
        opacity: 0;
        transform: translate(-100%, 0);
      }

    // 
    .fade-enter-active, .fade-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
      }
      .fade-enter {
        opacity: 0;
        transform: translate(0, 10%);
      }
      .fade-leave-active {
        opacity: 0;
        transform: translate(0, 10%);
      }
}
</style>
