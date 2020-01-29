/**
 * 把搜索历史以 ${value} 的形式存储在 localStorage.history 中
 */
window.localStorage.history ? '': window.localStorage.history = '';
let interception = list => {
    // 只存 15 个记录
    let newKeywords = '',
        newList = list.splice(list.length - 15, list.length);
        newList.forEach(element => {
        newKeywords += '${'+ element +'}';
    });
    window.localStorage.history = newKeywords;
    return newList;
}
export default {
    get() {
        // 匹配 ${value} 中的 value，返回一个数组
        let list = window.localStorage.history.match(/(?<=\${)[^}]*(?=\})/g);
        list instanceof Array && list.length > 15 ? list = interception(list) : '';
        return list && list.reverse();
    },
    set(value) {
        if(value) {
            let reg = new RegExp('\\$\\{'+ value +'\\}','g');
            // 如果历史记录里有这个字段，先把以前的删掉，再设置新的
            reg.test(window.localStorage.history) ? this.remove(value) : '';
            window.localStorage.history += '${'+ value +'}';
        }
    },
    remove(value) {
        let reg = new RegExp('\\$\\{'+ value +'\\}', 'g')
        window.localStorage.history =  window.localStorage.history.replace(reg, '');
    },
    clear() {
        window.localStorage.history = '';
    }
};