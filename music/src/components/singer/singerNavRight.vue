<template>
  <div class="nav-right">
    <li
      v-for="(item, i) in list"
      :class="{
        'nav-right-item':true,
        'letter-active': activeArr[i]
      }"
      @click="jump($event, i)"
      :data-id="`#letter-${item[0].cat}`"
    >{{item[0].cat.toUpperCase()}}</li>
  </div>
</template>

<script>
export default {
  props: {
    activeLetter: {
      type: Array
    },
    scroll: true,
    letter: true
  },
  data() {
    return {
      show: false,
      activeArr: [true],
      list: []
    };
  },
  methods: {
    conversion(target) {
      let arr = [];
      for(var item in target) {
        arr.push(target[item]);
      }
      return arr;
    },
    jump(e, i) {
      let letter = this.$props.letter;
      letter && this.scroll.scrollToElement(letter[i], 300);
    }
  },
  watch: {
    _letterChange(value) {
      this.activeArr = value;
    },
    _scroll(value) {
      this.scroll = value;
    }
  },
  computed: {
    _letterChange() {
      return this.$props.activeLetter;
    },
    _scroll() {
      return this.$props.scroll;
    }
  },
  created() {
    this.$root.$on("gingerType", value => {
      this.list = this.conversion(value);
      this.show = true;
    });
    this.scroll = this.$props.scroll;
  },

};
</script>

<style lang="less">
.nav-right {
    position: absolute;
    top: 50%;
    transform: translateY(-40%);
    right: 1rem;
    background-color: #ddd;
    border-radius: 1rem;
    z-index: 666;
    padding: 1rem .2rem;
  .nav-right-item {
      display: block;
      font-size: 1.2rem;
      width: 2rem;
      padding: .17rem 0;
      text-align: center;
      color: #353535;
  }
  .letter-active {
    color: #0190ff;
  }
}
</style>