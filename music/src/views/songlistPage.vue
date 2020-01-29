<template>
  <!-- 歌单详情 -->
  <div class="songlistPage">
    <detail @playAll="playAll" :name="$props.name" :datas="datas"></detail>
    <songlist :songlist="songlist"></songlist>
  </div>
</template>

<script>
import _interface from "@/api/index.js";
import detail from "@/components/playlistDetail/list-detail.vue";
import songlist from "@/components/playlistDetail/songlist.vue";
export default {
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      datas: {},
      songlist: []
    };
  },
  methods: {
    start(res) {
      // 处理不同组件请求数据的区别
      if (res) {
        if (this.$route.query.path == "artistSong") {
          let newRes = this.conversion(res.data);
          this.datas = newRes.artist;
          this.songlist = newRes.hotSongs;
        } else {
          this.datas = res.data.playlist;
          this.songlist = this.datas.tracks;
        }
      }

      this.$nextTick(() => {
        this.$store.commit("changeLoadingState", false);
      });
    },
    getData() {
      this.datas = {};
      this.songlist = [];
      this.$store.commit("changeLoadingState", true);
      _interface(
        this.$route.query.path || "playlistDetail",
        {
          id: this.$route.query.id
        },
        this.start
      );
    },
    conversion(data) {
      let artist = {
          coverImgUrl: data.artist.picUrl,
          name: data.artist.name,
          description: data.artist.briefDesc
        },
        hotSongs = data.hotSongs;
      return {
        artist,
        hotSongs
      };
    },
    playAll() {
      if(this.songlist[0]) {
        this.$router.push({name: 'player', query: {id: this.songlist[0].id, index: 0, list: this.songlist}})
      }
    }
  },
  computed: {
    newList() {
      return this.$route.query.id;
    }
  },
  watch: {
    newList(value) {
      console.log(value);
      value && this.getData();
    }
  },
  created() {
    this.getData();
  },
  components: {
    detail,
    songlist
  }
};
</script>

<style lang="less">
.songlistPage {
  position: fixed;
  width: 100%;
  top: 0 !important;
  left: 0;
  right: 0;
  z-index: 666;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 4.6rem;
  .songlist-scroll {
    margin-bottom: 4.6rem;
  }
}
</style>