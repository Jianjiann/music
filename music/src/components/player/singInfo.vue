<template>
    <div class="singInfo">
        <div class="goBack" @click="goBack"><img src="@/assets/images/player/goBack.png" alt=""></div>
        <div class="songInfo-content">
            <div class="song-name">{{$props.info.name}}</div>
         <div class="artists"><span v-for="(art, i) in $props.info.ar">{{i > 0 ? '/': ''}}{{art && art.name}}</span><span>{{info.al && '-' + info.al.name}}</span></div>
        </div>
    </div>
</template>
<script>
import { create } from 'domain';
export default {
    props: {
        info: {
            type: Object
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less">
    .singInfo {
        width: 100%;
        height: 4rem;
        color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: .3rem 1rem;
        align-items: center;
        background-color: rgba(0, 0, 0, .05);
        .songInfo-content {
            width: 30rem;
        }
        .song-name {
            font-size: 1.5rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .artists {
            font-size: 1.2rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .goBack {
            width: 2rem;
            margin-right: 1.2rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>