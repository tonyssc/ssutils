/**
 * @file 设备相关操作
 * @date 2018-03-01
 * @author sunshaocheng
 */



/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
const getExplore = () => {
    let sys = {};
    let ua = navigator.userAgent.toLowerCase();

    if (ua.match(/rv:([\d.]+)\) like gecko/)) {
        sys.ie = ua.match(/rv:([\d.]+)\) like gecko/)[1];
    } else if (ua.match(/msie ([\d.]+)/)) {
        sys.ie = ua.match(/msie ([\d.]+)/)[1];
    } else if (ua.match(/edge\/([\d.]+)/)) {
        sys.edge = ua.match(/edge\/([\d.]+)/)[1];
    } else if (ua.match(/firefox\/([\d.]+)/)) {
        sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
    } else if (ua.match(/(?:opera|opr).([\d.]+)/)) {
        sys.opera = ua.match(/(?:opera|opr).([\d.]+)/)[1];
    } else if (ua.match(/chrome\/([\d.]+)/)) {
        sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
    } else if (ua.match(/version\/([\d.]+).*safari/)) {
        sys.safari = ua.match(/version\/([\d.]+).*safari/)[1];
    }

    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie);
    if (sys.edge) return ('EDGE: ' + sys.edge);
    if (sys.firefox) return ('Firefox: ' + sys.firefox);
    if (sys.chrome) return ('Chrome: ' + sys.chrome);
    if (sys.opera) return ('Opera: ' + sys.opera);
    if (sys.safari) return ('Safari: ' + sys.safari);
    return 'Unkonwn';
};

/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getOS() {
    let userAgent = ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || '';
    // let vendor = ('navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase()) || ''
    let appVersion = ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) || '';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
    if (/mac/i.test(appVersion)) return 'MacOSX';
    if (/win/i.test(appVersion)) return 'windows';
    if (/linux/i.test(appVersion)) return 'linux';
}

module.exports = { getExplore, getOS };
