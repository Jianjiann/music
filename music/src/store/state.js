export default {
    loading: false, // boolean 是否显示 loading 动画
    searchKeyword: '', // string 搜索词
    play: false, // boolean 是否播放歌曲
    songInfo: {}, // object 歌曲信息
    playOrderIndex: 0, // number 当前播放顺序
    // to do list
    list: null, // array 当前播放列表
    showToDoList: false, // boolean 是否弹出当前播放列表
    songIndex: null, // number 选中歌曲索引
    closeIndex: null, // number 要删除歌曲的索引
    singleCyclePlay: false, // 是否单曲循环
    // 当前播放进度
    currentTime: null,
}