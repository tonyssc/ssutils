/**
 * @file 判断浏览器支持相关方法
 * @date 2018-03-02
 * @author sunshaocheng
 */



/**
 *
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean}
 */
function isSupportWebP() {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

module.exports = { isSupportWebP };
