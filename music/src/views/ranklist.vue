<template>
  <div class="ranklist" v-if="show">
    <scroll>
      <div class="ranklist-title">官方榜</div>
      <div class="officialRank">
        <router-link class="officialRank-item"
          :data-id="item.id"
          v-for="item in officialRank"
          :key="item.id"
          :to="{name: 'songlistPage', query: {id: item.id}}"
        >
          <div class="officialRank-picture">
            <img src="@/assets/images/lazy.jpg" alt />
            <div
              class="picture"
              :style="{backgroundImage: `url(${item.coverImgUrl}?param=200y200)`}"
            ></div>
          </div>
          <div class="topThree">
            <div
              class="topThree-item"
              v-for="(sItem, i) in item.tracks"
              :key="i + sItem.first"
            >{{`${i+1}. ${sItem.first}-${sItem.second}`}}</div>
          </div>
        </router-link>
      </div>
      <div class="ranklist-title">全球榜</div>
      <div class="rankList">
        <router-link class="rankList-item" 
        :data-id="gItem.id" 
        v-for="gItem in globalList" 
        :to="{name: 'songlistPage', query: {id: gItem.id}}"
        :key="gItem.id">
          <div class="image-wrapper">
            <div class="filter"></div>
            <div class="playCount">
              <img class="headset" src="@/assets/images/headset.png" alt />
              {{playCount(gItem.playCount)}}
            </div>
            <img src="@/assets/images/lazy.jpg" alt />
            <div
              class="picture"
              :style="{backgroundImage: `url(${gItem.coverImgUrl}?param=200y200)`}"
            ></div>
          </div>
          <div class="rankList-detail">{{gItem.name}}</div>
        </router-link>
      </div>
    </scroll>
  </div>
</template>

<script>
import getData from "@/api/index.js";
import scroll from "@/components/scroll.vue";
export default {
  data() {
    return {
      show: false,
      officialRank: [],
      globalList: []
    };
  },
  methods: {
    start(res) {
      let list = res.data.list;
      this.officialRank = list.splice(0, 4);
      this.globalList = list;
      this.show = true;
      this.$nextTick(() => {
        this.$emit("changeStatus", true);
        this.$store.commit("changeLoadingState", false);
      });
    },
    playCount(count) {
      return Math.floor(count * 0.0001) >= 1
        ? Math.floor(count * 0.0001) + "万"
        : count;
    }
  },
  components: {
    scroll
  },
  created() {
    getData("toplistDetail", null, this.start);
    this.$store.commit("changeLoadingState", true);
  },
  // keep-alive组件激活时调用
  activated() {
     this.show && this.$store.commit("changeLoadingState", false);
  }
};
</script>

<style lang="less">
.ranklist {
  padding-bottom: 1rem;
  background-color: #fff;
  .ranklist-title {
    font-size: 1.8rem;
    color: #000;
    margin: 0 0 0.6rem 2rem;
    padding-top: 1.5rem;
  }
  .officialRank-item {
    display: flex;
    padding: 0 1rem;
    margin-top: 0.7rem;
  }
  .officialRank-picture {
    position: relative;
    width: 10rem;
    height: 10rem;
    border-radius: 0.4rem;
    overflow: hidden;
  }
  .picture {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    top: 0;
  }
  .topThree {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    width: 23rem;
    padding: 0 1.2rem;
    border-bottom: 1px solid #ddd;
    font-size: 1.3rem;
    color: #666;
    line-height: 2.8rem;
    .topThree-item {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  // 全球榜
  .rankList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.5rem;
  }
  .rankList-item {
    margin-top: 1rem;
    width: 32%;
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .rankList-detail {
    box-sizing: border-box;
    padding: 0 0.6rem;
    font-size: 14px;
    margin-top: 0.4rem;
    color: #000;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>