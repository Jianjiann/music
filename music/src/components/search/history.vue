<template>
  <div class="history" v-if="show">
    <div class="search-history-box">
      <div class="search-content-title">
        历史记录
        <div class="clear" @click="clear">
          <img src="@/assets/images/clear.png" alt />
        </div>
      </div>
    </div>
    <div class="history-content">
      <li
        class="hisrtory-keyword"
        v-for="keyword in lists"
        @touchstart="touchStart(keyword)"
        @touchend="touchend(keyword)"
      >{{keyword}}</li>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage.js";
export default {
  data() {
    return {
      show: false,
      lists: null,
      isClick: false,
      timer: null
    };
  },
  watch: {
    changeKeyword(value) {
      storage.set(value);
      this.lists = storage.get();
      this.show = true;
    }
  },
  computed: {
      changeKeyword() {
        return this.$store.state.searchKeyword;
      }
  },
  methods: {
    search(keyword) {
      this.$router.push({name: 'searchList', query: {keyword: keyword}});
      return true;
    },
    clear() {
      this.confirm({
        message: '确定清空所有历史记录？',
        callback: storage.clear
      })
    },
    confirm(conf) {
      this.$confirm(conf.message, {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          typeof conf.callback == 'function' && conf.callback();
          this.lists = storage.get();
          !this.lists ? this.show = false: '';
        }).catch(() => {

        })
    },
    touchStart(keyword) {
      // 长按事件和点击事件冲突，这里模拟点击事件
      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      },300)

      // 长按事件
      this.timer = setTimeout(() => {
        this.confirm({
          message: '是否删除该记录？',
          callback: storage.remove.bind(this, keyword)
        });
      }, 1000);
    },
    touchend(keyword) {
      this.isClick && this.search(keyword);
      clearTimeout(this.timer);
    }
  },
  created() {
    this.lists = storage.get();
    this.lists ? (this.show = true) : "";
  },
};
</script>

<style lang="less">
.history {
  margin-top: 0.5rem;
  .clear {
    width: 1.8rem;
  }
  .history-content::after {
    display: block;
    content: "";
    clear: both;
  }
  .hisrtory-keyword {
    float: left;
    font-size: 1.5rem;
    color: #131313;
    margin: 0.5rem;
    padding: 0.5rem 1.2rem;
    border-radius: 1.4rem;
    background-color: #eee;
  }
}
</style>
