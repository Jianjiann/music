<template>
  <div class="scroll-box" ref="scroll">
    <div class="scroll-content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    toTop: {
      type: Boolean
    }
  },
  data() {
    return {
      scroll
    }
  },
   methods: {
    openScroll() {
        let scroll = new BScroll(this.$refs.scroll, {
        click: true,
        probeType: 3,
        bounce: false,
      });
      setTimeout(() => {
        scroll.refresh();
      }, 400)
      this.$emit('getScroll', scroll);
      scroll.pullingDown = (e) => {
        console.log(e)
      }
    }
  },
  data() {
    return {
      slide: "slide"
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.openScroll();
      });
  },
 
};
</script>

<style>
.scroll-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>