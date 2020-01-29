<template>
  <div class="navigationBar">
    <router-link class="option" tag="li" :to="{name: 'recommended'}">个性推荐</router-link>
    <router-link class="option" tag="li" :to="{name: 'playlist'}">歌单</router-link>
    <router-link class="option" tag="li" :to="{name: 'ranklist'}">排行榜</router-link>
    <router-link class="option" tag="li" :to="{name: 'singer'}">歌手</router-link>
  </div>
</template>

<script>
export default {
  name: 'navigationBar',
};
</script>

<style lang="less">
.navigationBar {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
    background-color: #0190ff;
    .option {
        font-size: 1.6rem;
        text-align: center;
        color: #fff;
        line-height: 2.6rem;
        padding: 0 1.4rem;
    }
    .option-active {
      color: #0190ff;
      background-color: #fff;
      border-radius: 1.4rem;
    }
}
</style>