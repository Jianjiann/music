<template>
  <div class="searchList">
    <img class="goBack" @click="goBack" src="@/assets/images/goBack.png" alt />
    <ul class="search-type">
      <li
        tag="li"
        v-for="(item, i) in type"
        :class="{
                option: true,
                'option-active': activeClass[i]
            }"
        @click="toggleType(i)"
      >{{item.name}}</li>
    </ul>
    <div class="content">
      <keep-alive>
        <scroll>
          <component :is="type[index].comp" :keyword="keyword"></component>
        </scroll>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import myAxios from "@/api/index.js";
import scroll from "@/components/scroll.vue";
import songs from "@/components/search/searchSongs.vue";
import artist from "@/components/search/searchArtists.vue";
import playlist from "@/components/search/searchPlaylist.vue";
import Storage from "@/utils/storage.js";
export default {
  data() {
    return {
      type: [
        { name: "歌曲", comp: "songs" },
        { name: "歌手", comp: "artist" },
        { name: "歌单", comp: "playlist" }
      ],
      activeClass: [true],
      index: 0,
      keyword: "",
      prevRoute: null
    };
  },
  watch: {
    _keyword(value) {
      this.keyword = value;
      this.$store.commit("changeKeyword", this.keyword);
    }
  },
  computed: {
    _keyword() {
      return this.$route.query.keyword;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleType(i) {
      this.index = i;
      this.activeClass = this.getNewArr(i);
    },
    getNewArr(index) {
      let arr = [];
      arr[index] = true;
      return arr;
    }
  },
  created() {
    this.keyword = this.$route.query.keyword;
    Storage.set(this.keyword);
    this.$store.commit("changeKeyword", this.keyword);

  },
  components: {
    scroll,
    songs,
    artist,
    playlist
  }
};
</script>

<style lang="less">
.searchList {
  z-index: 6666;
  background-color: #fafafa !important;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  top: 4.6rem !important;
  padding-top: 4.5rem;
  .goBack {
    position: absolute;
    width: 2.1rem;
    left: 1.5rem;
    top: 1.2rem;
  }
  .search-type {
    display: flex;
    padding: 0.3rem 0;
    background-color: #f0f0f0;
    justify-content: space-around;
  }
  .option {
    font-size: 1.5rem;
    color: #333;
    padding: 0.5rem;
    text-align: center;
  }
  .option-active {
    color: #0190ff;
    border-bottom: 0.15rem solid #0190ff;
  }
  .content {
    background-color: #fff;
    position: absolute;
    top: 8.16rem;
    width: 100%;
    bottom: 0;
  }
}
</style>