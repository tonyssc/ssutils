/**
 * @file 随机生成相关方法
 * @date 2018-03-01
 * @author sunshaocheng
 */

/**
 *
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
const randomColor = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
};

module.exports = { randomNum, randomColor };
