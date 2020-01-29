export default {
    type: [
        {
            tag: '推荐歌手',
            category: -1
        },
        {
            tag: '华语',
            category: 0
        },
        {
            tag: '欧美',
            category: 1
        },
        {
            tag: '日本',
            category: 2
        },
        {
            tag: '韩国',
            category: 3
        },
        {
            tag: '其他',
            category: 4
        }
    ],
    children: [
        { name: '华语男歌手', category: 0, cat: 1001 },
        { name: '华语女歌手', category: 0, cat: 1002 },
        { name: '华语组合/乐队', category: 0, cat: 1003 },
        { name: '欧美男歌手', category: 1, cat: 2001 },
        { name: '欧美女歌手', category: 1, cat: 2002 },
        { name: '欧美组合/乐队', category: 1, cat: 2003 },
        { name: '日本男歌手', category: 2, cat: 6001 },
        { name: '日本女歌手', category: 2, cat: 6002 },
        { name: '日本组合/乐队', category: 2, cat: 6003 },
        { name: '韩国男歌手', category: 3, cat: 7001 },
        { name: '韩国女歌手', category: 3, cat: 7002 },
        { name: '韩国组合/乐队', category: 3, cat: 7003 },
        { name: '其他男歌手', category: 4, cat: 4001 },
        { name: '其他女歌手', category: 4, cat: 4002 },
        { name: '其他组合/乐队', category: 4, cat: 4003 },
    ]
}