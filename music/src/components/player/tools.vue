<template>
    <div class="tools">
        <audio :src="songUrl" ref="myAudio"></audio>
        <div class="progrees-container">
            <span class="current">{{currentT}}</span>
            <div class="progress-bar" ref="progressBar">
                <div class="progress-bg" :style="{width: left}"></div>
                <div class="progress-point"
                @touchstart="(e)=>{audio && touchstart(e)}"
                @touchmove="(e)=>{audio && touchmove(e)}"
                @touchend="(e)=>{audio && touchend(e)}"
                :style="{
                    left: left
                }"></div>
            </div>
            <span class="duration">{{durationT}}</span>
        </div>
        <div class="tools-content">
            <div class="btn-icon btn-order" @click="changePlayOrder"><img :src="playOrder[playOrderIndex]" alt=""></div>
            <div class="tools-center">
                <div class="btn-icon btn-prev" @click="prev"><img :src="icon_prev" alt=""></div>
                <div class="btn-icon btn-play" @click="isPlay"><img :src="icon_play" alt=""></div>
                <div class="btn-icon btn-next" @click="next"><img :src="icon_prev" alt=""></div>
            </div>
            <div class="btn-icon btn-menu" @click="todoList"><img :src="icon_menu" alt=""></div>
        </div>
    </div>
</template>
<script>
import myAxios from '@/api/index.js';

// 图片
import cycle from '@/assets/images/player/cycle.png'
import random from '@/assets/images/player/random.png'
import singleCycle from '@/assets/images/player/singleCycle.png'
import order from '@/assets/images/player/order.png'
import menu from '@/assets/images/player/menu.png'
import pause from '@/assets/images/player/pause.png'
import play from '@/assets/images/player/play.png'
import prev from '@/assets/images/player/prev.png'
import { setInterval, clearInterval } from 'timers';
export default {
    props: {
        songId: {
            type: Number
        }
    },
    data() {
        return {
            icon_prev: prev,
            icon_play: pause,
            icon_menu: menu,
            songUrl: null,
            left: 0,
            progress: 0,
            playState: true,
            audio: null,
            timer: null,
            currentT: '00:00',
            durationT: '00:00',
            isUpdate: true,
            playOrder: [cycle, random, singleCycle],
            playOrderIndex: 0,
            singleCycle: false
        }
    },
    methods: {
        getData(id) {
            if(id) {
                myAxios('song', {
                id: id
                }, this.init)
            } else {
                this.pause();
                this.audio ? this.audio.src = undefined: '';
                this.durationT = '00:00';
                this.progress = 0;
            }
            
        },
        init(res) {
            this.songUrl = res.data.data[0].url;
            this.audio = this.audio || document.createElement('audio');
            this.audio.src = this.songUrl;
            this.$nextTick(() => {
                this.progressBar = this.$refs.progressBar;
                this.audio.oncanplay = () => {
                this.update();
                this.durationT = this.time(this.audio.duration);
                this.play();
                }
            })
        },
        isPlay() {
            if (this.audio) {
                this.playState ? this.play(): this.pause();
            }
        },
        play() {
            this.audio.play();
            this.icon_play = play;
            this.update();
            this.$store.commit('changePlayState', true);
            this.playState = false;
        },
        pause() {
            clearInterval(this.timer);
            this.audio && this.audio.pause();
            this.icon_play = pause;
            this.$store.commit('changePlayState', false);
            this.playState = true;
        },
        // 切换到上一首歌曲
        prev() {
            this.$emit("onchange", -1);
        },
        // 切换到下一首歌曲
        next() {
            this.$emit("onchange", 1);
        },
        update(time) {
            this.timer = setInterval(() => {
                if(this.isUpdate) { // 拖拽小点时不更新
                    // 更新歌曲进度
                    this.$store.commit('currentTimeChange', this.audio.currentTime);
                    this.progress = (this.audio.currentTime / this.audio.duration).toFixed(3);
                }
            }, 16)
        },
        time(time) {
            let m = parseInt(time / 60),
                s = parseInt(time % 60);
            m < 10 ? (m = "0" + m) : "";
            s < 10 ? (s = "0" + s) : "";
            return (m + ":" + s);
        },
        touchstart() {
            this.isUpdate = false;
        },
        touchmove(touch) {
            let event = touch.touches[0],
                target = event.target,
                barW = this.progressBar.clientWidth,
                left = event.pageX - this.progressBar.offsetLeft;
            if(left >= 0 && left <= barW) {
                // 拖拽小点位置
                this.left = left + 'px';
            }
        },
        touchend() {
            this.isUpdate = true;
            // 歌曲进度 0 - 1 的小数
            this.progress = (parseInt(this.left) / this.progressBar.clientWidth).toFixed(3);
            this.audio.currentTime = this.progress * this.audio.duration;
        },
        changePlayOrder() {
            this.playOrderIndex = (this.playOrderIndex + 1) % this.playOrder.length;
            this.$store.commit('changePlayOrder', this.playOrderIndex);

        },
        todoList() {
            this.$store.commit("showTodoList", true);
        }
    },
    watch: {
        idChange(id) {
            this.getData(id)
        },
        _isPlay(value) {
            value ? this.icon_play = play: this.icon_play = pause;
        },
        // 歌曲播放、进度条拖拽时更新 this.progress ，监听 this.progress 改变当前播放时间和进度条进度
        progress(value) {
            if(value == 1) { // 当前歌曲播放完
                if(this.singleCycle) {
                    this.audio.currentTime = 0;
                    value = 0;
                } else {
                    clearInterval(this.timer);
                    this.next();
                }
            }
            let curT = this.time(this.audio.duration * value);
            !/NaN/.test(curT) ? this.currentT = curT: '';
            this.left = value * this.progressBar.clientWidth + 'px';
        },
        playStateChange(status) {
            status ? this.play(): this.pause();
        },
        isSingleCyclePlay(status) {
            this.singleCycle = status;
        }
    },
    computed: {
        idChange() {
            return this.$props.songId;
        },
        playStateChange() {
            return this.$store.state.play;
        },
        isSingleCyclePlay() {
            return this.$store.state.singleCyclePlay;
        }
    },
    mounted() {
        this.getData(this.$props.songId)
    }
}
</script>

<style lang="less">
.tools {
    position: fixed;
    width: 100%;
    bottom: 0;
    .tools-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 4rem;
        box-sizing: border-box;
    }
    .btn-icon {
        width: 2rem;
    }
    .btn-play {
        width: 5rem;
    }
    .tools-center {
        display: flex;
        width: 14rem;
        justify-content: space-between;
        align-items: center;
    }
    .btn-next {
        transform: rotateZ(180deg);
    }
    // 进度条
    .progrees-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 1rem 1.7rem;
    }
    .current,
    .duration {
        font-size: 1.2rem;
    }
    .current {
        color: #fff;
    }
    .duration {
        color: #fff;
    }
    .progress-bar {
        position: relative;
        width: 24rem;
        height: .16rem;
        background-color: rgba(255, 255, 255, .3);
        border-radius: .2rem;
    }
    .progress-point {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
        width: .6rem;
        height: .6rem;
        box-shadow: 0 0 .3rem #999;
        background-color: #0190ff;
        border-radius: 50%;
    }
    .progress-bg {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, .5);
        border-radius: .2rem;
    }
}
</style>