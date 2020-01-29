<template>
  <div class="recommended" v-if="show">
    <scroll>
      <banner></banner>
      <div class="recommended-title">推荐歌单</div>
      <div class="recommended-content">
        <router-link class="recommended-item" 
        v-for="item in playlists"
        :data-id="item.id" 
        :key="item.id"
        :to="{name: 'songlistPage', query: {id: item.id}}"
        >
          <div class="image-wrapper">
            <div class="filter"></div>
            <div class="playCount">
              <img class="headset" src="@/assets/images/headset.png" alt />
              {{playCount(item.playCount)}}
            </div>
            <img src="@/assets/images/lazy.jpg" alt />
            <div
              class="picture"
              :style="{
                    backgroundImage: `url(${item.picUrl}?param=200y200)`
            }"
            ></div>
          </div>
          <div class="detail">{{item.name}}</div>
        </router-link>
      </div>
      <!--  -->
      <div class="recommended-title">推荐热歌</div>
      <hotSong></hotSong>
    </scroll>
  </div>
</template>
<script>
import getData from "@/api/index";
import banner from "@/components/recommended/banner";
import hotSong from "@/components/recommended/hotSong";
import scroll from "@/components/scroll.vue";
export default {
  components: {
    scroll,
    banner,
    hotSong
  },
  props: {
    order: {
      type: String,
      default: "hot",
      validator(val) {
        return val == "new" || val == "hot";
      }
    },
    limit: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      show: false,
      loading: true
    };
  },
  methods: {
    start(res) {
      typeof res == "object" ? (this.playlists = res.data.result) : "";
      this.$nextTick(() => {
        this.show = true;
        this.$emit("changeStatus", true);
        
      });
    },
    playCount(count) {
      return Math.floor(count * 0.0001) >= 1
        ? Math.floor(count * 0.0001) + "万"
        : count;
    }
  },
  created() {
    this.$store.commit("changeLoadingState", true);
    getData(
      "personalized",
      {
        limit: this.$props.limit
      },
      this.start
    );
  },
  // keep-alive组件激活时调用
  activated() {
     this.show && this.$store.commit("changeLoadingState", false);
  }
};
</script>

<style lang="less">
.recommended {
  position: fixed;
  width: 100%;
  top: 8.76rem;
  bottom: 4.6rem;
  box-sizing: border-box;
  background-color: #fff;
  .recommended-title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 2rem;
    padding-left: 1rem;
  }
  .recommended-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0.5rem;
  }
  .picture {
    position: absolute;
    top: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
  }
  .recommended-item {
    width: 32%;
    margin-top: 1rem;
  }
  .image-wrapper {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .image-wrapper img {
    width: 100%;
  }
  .detail {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    color: #000;
    line-height: 1.9rem;
    height: 3.8rem;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 0.6rem;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>