<template>
  <!-- 轮播图 -->
  <div class="banner">
    <div class="banner-bg"></div>
    <div class="swiper-container banner-swiper" ref="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide baner-slide" v-for="item in lists">
          <img :src="`${item.pic}?param=567y220`" alt />
        </div>
      </div>
      <div ref="bannerPagination"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import getData from "@/api/index.js";
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      render: false,
      lists: null
    };
  },
  methods: {
    start(res) {
      typeof res == "object"
        ? ((this.lists = res.data.banners), (this.render = true))
        : "";
      // 在下次 DOM 更新循环结束之后启动轮播图
      this.$nextTick(() => {
        this.setSwiper();
      });
    },
    setSwiper() {
      new Swiper(this.$refs.banner, {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        slidesPerGroup: 1,
        spaceBetween: 20,
        pagination: {
          el: this.$refs.bannerPagination,
          clickable: true
        }
      });
    }
  },
  created() {
    // 获取数据
    getData(
      "banner",
      {
        type: 1
      },
      this.start
    );
  }
};
</script>
  
<style lang="less">
.banner {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  .banner-bg {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 80%;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    background-color: #0190ff;
  }
  .baner-slide img {
    width: 100%;
  }
  .baner-slide {
    border-radius: 0.7rem;
    overflow: hidden;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0.5rem;
    text-align: center;
    z-index: 2;
      .swiper-pagination-bullet {
        opacity: 0.8;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 0.4rem;
        background-color: #fff;
        outline: none;
      }
      .swiper-pagination-bullet-active {
        width: 2rem;
        height: 0.8rem;
        border-radius: 0.8rem;
        background-color: #0190ff;
      }
  }
}
</style>