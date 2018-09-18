/**
 * @file 浏览器URL参数处理
 * @date 2018-02-28
 * @author sunshaocheng
 */

/**
 *
 * @desc   获取url路径名
 * @return {String} default: index
 */
const getPageName = () => {
    let u = window.location.pathname;
    let a = u.split(/\//);
    let m = a.pop().match(/(?:^|\/)($|[^.]+)/);

    return m[1] ? m[1] : 'index';
};

/**
 *
 * @desc   获取url参数
 * @param  {String} name  参数名
 * @return {String}
 */
const getQueryString = (name) => {
    let u = window.location.search.slice(1);
    let re = new RegExp(name + '=([^&\\s+]+)');
    let m = u.match(re);
    let v = m ? m[1] : '';

    return (v === '' || isNaN(v)) ? v : v - 0;
};

/**
 *
 * @desc   获取url中hash值
 * @param  {String} name  hash键值
 * @return {String}
 */
const getHash = (name) => {
    let u = window.location.hash.slice(1);
    let re = new RegExp(name + '=([^&\\s+]+)');
    let m = u.match(re);
    let v = m ? m[1] : '';

    return (v === '' || isNaN(v)) ? v : v - 0;
};

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
const parseQueryString = (url) => {
    let urlTemp;
    urlTemp = url == null ? window.location.href : url;
    let search = urlTemp[0] === '?' ? urlTemp.substr(1) : urlTemp.substring(urlTemp.lastIndexOf('?') + 1);
    if (search === '') return {};
    search = search.split('&');
    let query = {};
    for (let i = 0; i < search.length; i++) {
        let pair = search[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};

/**
 *
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
const stringfyQueryString = (obj) => {
    if (!obj) return '';
    let pairs = [];

    for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
            let value = obj[key];

            if (value instanceof Array) {
                for (let i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }

    return pairs.join('&');
};

/**
 *
 * @desc   设置来源
 * @return {String}
 */
const getNewApiUrl = type => {
    let host  = window.location.host;
    let apiUrl = '';

    if (host.indexOf('www') === -1) {
        apiUrl = type + '.' + host;
    }
    else {
        apiUrl = host.replace('www', type);
    }

    return apiUrl;
};

module.exports = { 
    getPageName, 
    getQueryString, 
    getHash, 
    parseQueryString, 
    stringfyQueryString, 
    getNewApiUrl 
};
