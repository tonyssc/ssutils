/**
 * @file 浏览器UA判断
 * @date 2017-07-24
 * @author sunshaocheng
 */

const getBrowser = () => {
    let UA = navigator.userAgent || '';
    let isAndroid = (() => {
        return !!UA.match(/Android/i);
    })();
    let isQQ = (() => {
        return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d.]+)/.test(UA) || /\bV1_AND_SQI?_([\d.]+)(.*? QQ\/([\d.]+))?/.test(UA);
    })();
    let isIOS = (() => {
        return !!UA.match(/iPhone|iPad|iPod/i);
    })();
    let isSafari = (() => {
        return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA);
    })();
    let isWx = (() => {
        return !!UA.match(/micromessenger/i);
    })();
    let isWb = (() => {
        return !!UA.match(/weibo/i);
    })();
    let isAndroidChrome = (() => {
        return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ;
    })();
    let isQZ = (() => {
        return UA.indexOf('Qzone/') !== -1;
    })();
    let browser = {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isSafari: isSafari,
        isQQ: isQQ,
        isWb: isWb,
        isWx: isWx,
        isQZ: isQZ,
        isAndroidChrome: isAndroidChrome
    };
    return browser;
};

const browserRedirect = (uri, ignorePad = true) => {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
    // 如果忽略pad
    if (ignorePad) {
        bIsIpad = false;
    }
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
    let bIsMidp = sUserAgent.match(/midp/i) === 'midp';
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4';
    let bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb';
    let bIsAndroid = sUserAgent.match(/android/i) === 'android';
    let bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce';
    let bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile';

    // 移动端
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        window.location.href = uri;
    }
};

module.exports = { getBrowser, browserRedirect };
