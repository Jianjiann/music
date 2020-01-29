<template>
<!-- 搜索建议框组件 -->
  <div class="search-container">
    <div class="search-header" @click="preventDefault">
      <div class="logo">music</div>
      <div class="search-box" @click="view">
        <input class="search" ref="search" type="text" placeholder="搜索歌曲/歌手/歌单" @touchstart.stop="()=>{}" @focus="debounce($event, search)" @input="debounce($event, search)"/>
        <span class="search-button" @click="tosearchResult">
          <img src="@/assets/images/magGlass.png" alt />
        </span>
      </div>
    </div>
    <suggest :suggest="sug"></suggest>
    <keep-alive>
      <transition name="slideIn">
        <div class="search-content" v-if="showContent">
          <div class="close-content"><img @click="close" class="close" src="@/assets/images/close.png" alt=""></div>
            <scroll>
                <history></history>
                <div class="search-hot-box">
                  <div class="search-content-title">热搜榜</div>
                  <router-link class="search-hot-list" 
                      v-for="(item, i) in hotList"
                      :to="{name: 'searchList', query: {keyword: item.searchWord}}">
                      <span class="hot-index">{{Number(i) + 1}}</span>
                      <div class="hot-list-info">
                        <div class="hot-name">
                          <span>{{item.searchWord}}</span>
                          <img :src="item.iconUrl" alt="" class="hot-icon">
                        </div>
                        <div class="hot-content">{{item.content}}</div>
                      </div>
                      <span class="score">{{item.score}}</span>
                  </router-link>
                </div>
            </scroll>
        </div>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import scroll from '@/components/scroll.vue';
import _interface from '@/api/index.js';
import history from '@/components/search/history.vue';
import suggest from '@/components/search/searchSuggest.vue';
export default {
  data() {
    return {
      showContent: false,
      hotList: [],
      timer: null,
      sug: []
    };
  },
  methods: {
    start(res) {
      this.hotList = res.data.data;
    },
    debounce(e, handle) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
          handle(e);
      }, 1000)
    },
    suggest(res) {
      res ? this.sug = res.data.result.allMatch: this.sug = [];
    },
    search(e) {
      let value = e.target.value;
     value ? _interface("suggest",{
        keywords: value,
        type: 'mobile'
      }, this.suggest): this.suggest();
    },
    tosearchResult(e) {
      let value = this.$refs.search.value;
       if (value) {
          this.$route.name == 'searchList'
          ? this.$router.replace({name: 'searchList', query: {keyword: value}})
          : this.$router.push({name: 'searchList', query: {keyword: value}});
      }
        this.suggest(false);
    },
    view(e) {
      this.showContent = true;
    },
    close() {
      this.showContent = false;
    },
    preventDefault(e) {
      e = e || window.event;
      e.stopPropagation();
      e.cancelBubble = true;
    }
  },
  components: {
    scroll,
    suggest,
    history
  },
  created() {
    _interface("searchHot", null, this.start)
    // 点击其它地方关闭提示框
    document.addEventListener('touchstart', () => {
      this.suggest(false);
    }, false)
  },
};
</script>

<style lang="less">
.search-container {
  .search-header {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1.2rem;
  }
  .logo {
    font-size: 2.5rem;
    color: #0190ff;
    font-family: "宋体";
  }
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 27rem;
    height: 2.8rem;
    box-sizing: border-box;
    padding-left: 1rem;
    border: 1.5px solid #34a6ff;
    border-radius: 2.8rem;
  }
  .search {
    color: #666;
    width: 22rem;
    font-size: 1.2rem;
    height: 1.6rem;
    outline: none;
    border: none;
    background-color: transparent;
  }
  .search-button {
    position: relative;
    display: block;
    position: absolute;
    right: 0.7rem;
    width: 2rem;
    height: 2rem;
  }
  .search-button > img {
    width: 100%;
    height: 100%;
  }
  // 内容区
  .search-content {
    position: absolute;
    top: 4.8rem;
    z-index: 666;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    background-color: #fff;
    width: 100%;
    bottom: 4.6rem;
    box-sizing: border-box;
    padding: 1.5rem;
  }
  .close-content {
    padding-bottom: .7rem;
    text-align: right;
  }
  .close {
    display: inline-block;
    width: 1.7rem;
  }

  // 历史记录
  .search-content-title {
    margin-top: 1.2rem;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    font-size: 1.8rem;
    color: #0190ff;
    font-weight: bold;
    border-bottom: 1px solid #0190ff;
    padding: 0 .5rem .2rem 0;
  }
  // 热搜列表
  .search-hot-box {
    padding-bottom: 1rem;
  }
  .search-hot-list {
    display: flex;
    padding: .5rem 0;
  }
  .search-hot-list:nth-of-type(1),
  .search-hot-list:nth-of-type(2),
  .search-hot-list:nth-of-type(3) {
    .hot-index {
      color: #ff0000;
    }
    .hot-name {
      font-size: 1.6rem;
      color: #161616;
    }
  }
  .hot-index {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    font-size: 1.6rem;
    color: #555;
  }
  .hot-list-info {
    width: 24rem;
    margin-left: 1.2rem;
  }
  .hot-name {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #444;
    font-weight: bold;
  }
  .hot-icon {
    display: inline-block;
    width: auto;
    height: 1.5rem;
    margin-left: .5rem;
  }
  .hot-content {
    width: 100%;
    font-size: 1.2rem;
    color: #666;
    overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
  }
  .score {
    padding-top: .5rem;
    width: 7rem;
    text-align: right;
    font-size: 1.3rem;
    color: #777;
  }
  // 过渡动画
  .slideIn-enter-active,
  .slideIn-leave-active {
    will-change: transform;
    transition: all 300ms;
    position: absolute;
  }
  .slideIn-enter {
    opacity: 0;
    transform: translate(0, 100%);
  }
  .slideIn-leave-active {
    opacity: 0;
    transform: translate(0, 0);
  }
}
</style>