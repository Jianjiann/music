<template>
  <!-- 标签列表 -->
  <div class="tags">
    <div class="tags-content">
      <router-link 
      :class="{
        'tag': true,
        'tag-active': tagsClass[i]
      }"
      @click.native="toggleActive(item, i)"
      v-for="(item, i) in $props.lists"
      :style="{
        display: isShow[item.category] ? 'flex': 'none'
      }"
      :key="item.id"
      tag="li"
      :to="{ name: $props.to }"
      >{{item.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true
    },
    category: {
      type: Number
    },
    to: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShow: [],
      tagsClass: []
    };
  },
  watch: {
    _category(value, oldVal) {
      value == -1 && this.toggleActive("default", -1);
      this.isShow = this.newArray(value)
    }
  },
  computed: {
    _category() {
      return this.$props.category;
    },
  },
  methods: {
    newArray(index) {
      let arr = [];
      arr[index] = true;
      return arr;
    },
    toggleActive(item, index) {
      this.tagsClass = this.newArray(index);
      // 传递点击的字段，隐藏列表
      this.$emit('listen', item);
    }
  }
};
</script>

<style lang="less">
.tags {
  position: absolute;
  z-index: 666;
  top: 3.98rem;
  background-color: rgba(255, 255, 255, 0.95);
  width: 100%;
  .tags-content {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    width: 12.5rem;
    box-sizing: border-box;
    height: 3.7rem;
    font-size: 1.4rem;
    color: #666;
    border: 1px solid #ddd;
  }
  .tag-active {
    position: relative;
    border-color:#0190ff;
    color: #0190ff;
  }
  .tag-active::before {
    position: absolute;
    content: '';
    width: .65rem;
    height: .65rem;
    right: .8rem;
    bottom: .8rem;
    border-radius: 50%;
    background-color: #0190ff;
  }
}
</style>