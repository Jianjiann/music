<template>
  <div class="singerlist">
    <ul class="singerlist-item" 
    v-for="item in singerlist">
      <div ref="letter" class="letter" :id="`letter-${item[0].cat}`">{{item[0].cat.toUpperCase()}}</div>
      <router-link class="singer" :data-id="ginger.id"
                        tag="li"
                         v-for="ginger in item"
                         :to="{name: 'songlistPage', query: {id: ginger.id, path: 'artistSong'}}">
        <div class="image-wrapper">
          <img src="@/assets/images/lazy.jpg" alt />
          <div
            class="singer-phto"
            :style="{
                backgroundImage: `url(${ginger.picUrl}?param=90y90)`
              }"
          ></div>
        </div>
        <span>{{ginger.name}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import c2pin from "c2pin";
import getData from "@/api/index.js";
export default {
  props: ["singerlistType"],
  data() {
    return {
      show: false,
      singerlist: []
    };
  },
  watch: {
    getType(value, oldValue) {
      this.init(value);
    }
  },
  computed: {
    getType() {
      return this.$props.singerlistType;
    }
  },
  methods: {
    init(value) {
      this.$store.commit("changeLoadingState", true);
      value !== "推荐歌手"
        ? getData("artistlist", {
              cat: value.cat,
              offset: 0
            },this.start)
        : getData("artists", null, this.start);
    },
    start(res) {
      if (typeof res == "object") {
        /**
         * 首字母排序
         * 如果是英文，转换成小写再取 unicode 码。
         * 否则如果是中文，转换成小写英文再取 unicode 码。
         * 都不是的话，让它的 Unicode 码比英文的大，这样在排序中它会排最后
         */
        let lists = res.data.artists.sort((prev, next) => {
          let p = this.isEnglish(prev.name[0])
            ? prev.name[0].toLowerCase()
            : this.isChinese(prev.name[0])
            ? c2pin.firstChar(prev.name[0]).toLowerCase()
            : "~";
          let n = this.isEnglish(next.name[0])
            ? next.name[0].toLowerCase()
            : this.isChinese(next.name[0])
            ? c2pin.firstChar(next.name[0]).toLowerCase()
            : "~";
          prev.cat = p;
          next.cat = n;
          return p.charCodeAt() - n.charCodeAt();
        });
        this.structure(lists);
        this.$nextTick(() => {
          this.$store.commit("changeLoadingState", false);
        })
      }
    },
    isChinese(value) {
      return /.*[\u4e00-\u9fa5]+.*$/.test(value);
    },
    isEnglish(value) {
      return /[A-Za-z]+/.test(value);
    },
    // 用排好序的数据生成新的数据结构
    structure(arr) {
      let temp = {};
      arr.forEach((item, i) => {
        !temp[item.cat] ? (temp[item.cat] = []) : "";
        temp[item.cat].push({
          name: item.name,
          id: item.id,
          index: i,
          cat: item.cat,
          picUrl: item.picUrl
        });
      });
      this.singerlist = temp;
      this.$root.$emit("gingerType", temp);
      
      this.show = true;
      this.$nextTick(() => {
        this.$emit("getLetter", this.$refs.letter);
      })
    },
  },
  created() {
    this.init(this.$props.singerlistType);
  }
};
</script>

<style lang="less">
.singerlist {
  .letter {
    font-size: 1.6rem;
    color: #0190ff;
    padding: 0.6rem 1.2rem;
    background-color: #f2f2f2;
  }
  .singer {
    display: flex;
    box-sizing: border-box;
    padding: 0.8rem 2rem;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }
  .image-wrapper {
    position: relative;
    width: 4.6rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.5rem;
  }
  .singer-phto {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 66;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>