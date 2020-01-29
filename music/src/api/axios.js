import axios from 'axios';
import conf from '@/api/config.js';
export default function (url, params) {
    return axios(conf.serverUrl + url + parseParams(params))
}
function parseParams(params) {
    if (Object.prototype.toString.call(params) !== "[object Object]") {
        return '';
    }
    let paramsStr = '?';
    for (var p in params) {
        paramsStr += `${p}=${params[p]}&`;
    }
    let lastIndex = paramsStr.length - 1;
    paramsStr[lastIndex] == '&' ? paramsStr = paramsStr.substring(0, lastIndex): '';
    return paramsStr;
}