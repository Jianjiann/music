import axios from './axios';
const INTERFACE = {
    // 歌单
    playlist: '/top/playlist', // 获取歌单
    personalized: '/personalized', // 推荐歌单
    playlistDetail: '/playlist/detail', // 获取歌单详情
    catlist: '/playlist/catlist', // 歌单分类
    // 首页轮播图
    banner: '/banner', // banner 图数据
    // 排行榜
    top: '/top/list', // 排行榜
    newsong: '/personalized/newsong',
    toplist: '/toplist', //获取所有榜单
    toplistDetail: '/toplist/detail', // 获取所有榜单内容摘要
    // 歌手
    artists: '/top/artists', // 热门歌手
    artistlist: '/artist/list', // 歌手分类列表
    playUrl: '/song/url',
    artistSong: '/artists', // 获取歌手单曲
    // 搜索
    search: '/search', // 搜索
    searchHot: '/search/hot/detail', // 获取热搜列表
    suggest: '/search/suggest',
    // 歌曲
    songDetail: '/song/detail',
    song: '/song/url',
    // 歌词
    lyric: '/lyric'
}
export default function (name, params, callback) {
    axios(INTERFACE[name], params)
        .then(res => {
            callback(res)
        })
        .catch(err => {
            callback(null);
            console.warn(err);
        })
}