/**
 * @file dom相关操作方法
 * @date 2018-03-01
 * @author sunshaocheng
 */



/**
 *
 * @desc 获取滚动条距顶部的距离
 */
const getScrollTop = () => {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
};

/**
 *
 * @desc 设置滚动条距顶部的距离
 */
const setScrollTop = (value) => {
    window.scrollTo(0, value);
    return value;
};

/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
const offset = (ele) => {
    let eleTemp = ele;
    let pos = {
        left: 0,
        top: 0
    };
    while (eleTemp) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        eleTemp = ele.offsetParent;
    }
    return pos;
};

/**
 *
 * @desc H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {Function} upCb 当软键盘弹起的回调
 */
const windowResize = (downCb, upCb) => {
    let clientHeight = window.innerHeight;
    let downCbFn = typeof downCb === 'function' ? downCb : function () {};
    let upCbFn = typeof upCb === 'function' ? upCb : function () {};
    window.addEventListener('resize', () => {
        let height = window.innerHeight;
        if (height === clientHeight) {
            downCbFn();
        }
        if (height < clientHeight) {
            upCbFn();
        }
    });
};

/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
let requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function (callback) {
             window.setTimeout(callback, 1000 / 60);
         };
})();
const scrollTo = (to, duration) => {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    let diff = to - getScrollTop();
    if (diff === 0) return;
    let step = diff / duration * 10;
    requestAnimFrame(
        function () {
            if (Math.abs(step) > Math.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                return;
            }
            setScrollTop(getScrollTop() + step);
            if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
                return;
            }
            scrollTo(to, duration - 16);
        });
};

/* istanbul ignore next */
const trim = function(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
const hasClass = (el, cls) => {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/* istanbul ignore next */
const addClass = (el, cls) => {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* istanbul ignore next */
const removeClass = (el, cls) => {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/**
 * @desc 获取style样式
 * @param  {Dom} element dom元素
 * @param  {String} styleName 要获取的样式名字
 *
 * @return {String} 样式
 */
const getStyle = (element, styleName) => {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
}

/* istanbul ignore next */
const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

module.exports = { 
    getScrollTop, 
    setScrollTop, 
    offset, 
    windowResize, 
    scrollTo, 
    hasClass,
    addClass,
    removeClass,
    getStyle,
    on,
    off
};
