<template>
  <div class="searchSuggest" @touchstart.stop="()=>{}" v-if="list.length > 1">
      <li class="item" v-for="item in list" @mousedown.stop="()=>{}" @click="search(item.keyword)">
        <img class="magGlass" src="@/assets/images/magGlass.png" alt />
        <span class="keyword">{{item.keyword}}</span>
      </li>
  </div>
</template>

<script>
export default {
  props: {
    suggest: {
      type: Array
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    search(value) {
      if (value) {
          this.$route.name == 'searchList'
          ? this.$router.replace({name: 'searchList', query: {keyword: value}})
          : this.$router.push({name: 'searchList', query: {keyword: value}});
      }
      this.list = [];
    }
  },
  computed: {
    _suggest() {
      return this.$props.suggest;
    }
  },
  watch: {
    _suggest(value) {
      value ? this.list = value: this.list = [];
    }
  },
  created() {

  },
  components: {
    scroll
  }
};
</script>

<style lang="less">
.searchSuggest {
  top: 4.1rem;
  position: absolute;
  width: 90%;
  left: 5%;
  z-index: 6667;
  padding: 0.5rem 0;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.8rem #999;
  .item {
    display: flex;
    align-items: center;
    padding: 1rem 0.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
  }
  .magGlass {
    width: 2rem;
    margin-right: 0.7rem;
  }
  .keyword {
    width: 27rem;
    font-size: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }
}
</style>