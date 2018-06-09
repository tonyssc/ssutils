/**
 * @file cookie相关操作
 * @date 2018-03-01
 * @author sunshaocheng
 */

/**
 *
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String}
 */
const getCookie = (name) => {
    let arr = document.cookie.replace(/\s/g, '').split(';');
    for (let i = 0; i < arr.length; i++) {
        let tempArr = arr[i].split('=');
        if (tempArr[0] === name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
};

/**
 *
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
const setCookie = (name, value, days) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 *
 * @desc 根据name删除cookie
 * @param  {String} name
 */
const removeCookie = (name) => {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, '1', -1);
};

module.exports = { getCookie, setCookie, removeCookie };
