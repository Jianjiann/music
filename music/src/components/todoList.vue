<template>
    <div :class="{
        'todoList': true,
        'show': show
    }">
        <div class="todoList-close-wrapper"><img class="todoList-close" @click="hide" src="@/assets/images/songList-close.png" alt=""></div>
        <div class="todoList-title">
            播放列表（{{list.length}}）
            <div class="clearList" @click.stop="clearList"><img src="@/assets/images/clear.png" alt=""></div>
        </div>
        <ul class="todoList-content">
            <scroll>
                <li  v-for="(item, index) in list"
                    :key="item.id"
                    :class="{
                    'song': true,
                    'song-active': activeClass[index]
                    }"
                    @click.stop="play(index)"
                    >
                   <span class="song-name">{{item.name}}</span>
                   <div class="removeSong" :data-index="index" @click.stop="removeSong(index, $event)"><img src="@/assets/images/close.png" alt=""></div>
                   </li>
            </scroll>
        </ul>
    </div>
</template>

<script>
import scroll from '@/components/scroll.vue';
export default {
    data() {
        return {
            show: false,
            list: [],
            activeClass: []
        }
    },
    watch: {
        listChange(list) {
            if (Object.prototype.toString.call(list) == "[object Array]") {
                this.list = list;
            }
        },
        isShow(status) {
            this.show = status;
        },
        indexChange(index) {
            this.activeClass = this.newArray(index);
        }
    },
    computed: {
        listChange() {
            return this.$store.state.list;
        },
        isShow() {
            return this.$store.state.showToDoList;
        },
        indexChange() {
            return this.$store.state.songIndex;
        },
    },
    methods: {
        removeSong(index, e) {
            this.$store.commit('changeCloseIndex', null);
            setTimeout(() => {
                this.$store.commit('changeCloseIndex', Number(index));
            })
        },
        hide() {
            this.$store.commit("showTodoList", false);
        },
        play(index) {
            this.$store.commit('changeSongIndex', Number(index));
        },
        newArray(index) {
            let arr = [];
                arr[index] = true;
            return arr;
        },
        clearList() {
            this.list = [];
            this.$store.commit("changeList", this.list);
        }
    },
    components: {
        scroll
    }
}
</script>

<style lang="less">
.todoList {
    position: fixed;
    bottom: 0;
    z-index: 77778;
    width: 100%;
    box-sizing: border-box;
    padding: .4rem 1.5rem;
    background-color: #fff;
    transform: translateY(110%);
    transition: transform .1s ease-in-out;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    .todoList-close-wrapper {
        text-align: center;
        padding: .4rem 0;
    }
    .todoList-close {
        display: inline-block;
        width: 2.5rem;
    }
    .todoList-title {
        position: relative;
        box-sizing: border-box;
        font-size: 1.8rem;
        padding: .4rem 0;
        color: #0190ff;
        border-bottom: 1px solid #0190ff;
    }
    .clearList {
        position: absolute;
        width: 1.8rem;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .todoList-content {
        position: relative;
        height: 29rem;
    }
    .song {
        display: flex;
        justify-content: space-between;
        padding: .7rem 0;
        border-bottom: 1px solid #f1f1f1;
        color: #666;
    }
    .song-name {
        width: 32rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .song-active {
        color: #0190ff;
    }
    .removeSong {
        width: 1.2rem;
        display:flex;
        align-items: center;
    }
}


.todoList.show {
    transform: translateY(0);
    transition: transform .3s ease-in-out;
}
</style>