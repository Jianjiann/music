
export default {
    // 改变 loading 状态（是否显示 loading 动画）
    changeLoadingState(state, status) {
        state.loading = status;
    },
    // 当前搜索词
    changeKeyword (state, value) {
        state.searchKeyword = value;
    },
    // 当前播放歌曲的信息
    setSongInfo (state, info) {
        state.songInfo = info;
    },
    // 改变播放状态
    changePlayState(state, status) {
        state.play = status;
    },
    // 改变播放顺序
    changePlayOrder(state, index) {
        state.playOrderIndex = index;
    },
    // 更新播放任务列表
    changeList(state, list) {
        state.list = list;
    },
    // 是否显示播放任务列表
    showTodoList(state, status) {
        state.showToDoList = status;
    },
    // 任务列表的索引与播放器的索引相映射 
    changeSongIndex(state, index) {
        state.songIndex = index;
    },
    // （任务列表里）要删除歌曲的索引
    changeCloseIndex(state, index) {
        state.closeIndex = index;
    },
    isSingleCyclePlay(state, status) {
        state.singleCyclePlay = status;
    },
    currentTimeChange(state, currentTime) {
        state.currentTime = currentTime;
    },
    isLrcScroll(state, status) {
        state.lrcScroll = status;
    }
};