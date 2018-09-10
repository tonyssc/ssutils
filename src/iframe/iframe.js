/**
 * @file iqyiframe相关操作
 * @date 2018-06-26
 * @author sunshaocheng
 */

'use strict'
import Type from '../object/type'

/**
 *
 * @desc   获取title
 * @param  {String}  title
 */
const setParentTitle = title => {
    if (window.top !== window.self) {
        window.top.document.title = title;
    } else {
        console.error('This page is not include by other pages.');
    }
}

/**
 *
 * @desc  iframe父级页面跳转
 * @param 跳转的页面地址 {String} url 
 */
const reloadIframeUrl = url => {
    if (url && Type.url.isString) {
        if (window.top !== window.self) {
            window.top.location.href = url
        } else {
            window.location.href = url
        }
    } else {
        console.error('请检查参数，参数必须为字符串！');
    }
}

/**
 *
 * @desc  重置Layer位置
 * @param 跳转的页面地址 {Object} options top: 纵向top值，left: 横向left值
 * @return 重置之后的坐标值 { Object }
 */
const resetLayerOffset = options => {
    let defaultOptions = {
        left: 'auto',
        top: 'auto',
        fixed: true
    }
    if (window.top !== window.self) {
        if (Type.isObject(options)) {
            let win = window.top
            let offset = getScrollXY(win)
            options.top = offset.Y + options.top
            options.left = offset.X + options.left

            Object.assign(defaultOptions, options)
            // 固定父级窗口
            if (defaultOptions.fixed) {
                toggleParentFixed(true)
            }
        } else {
            alert('参数必须为对象！')
        }
    }
    return defaultOptions
}

/**
 *
 * @desc  获取窗口滚动坐标
 * @param 窗口window对象，当前窗口或iframe父级窗口
 * @return { Object } x: 横坐标, y: 纵坐标
 */
const getScrollXY = win => {
    if (process.env.NODE_ENV === 'iqiyi') {
        document.domain = "iqiyi.com"
    }
    let supportPageOffset = win.pageXOffset !== undefined
    let isCSS1Compat = ((win.document.compatMode || "") === "CSS1Compat")

    let x = supportPageOffset ? win.pageXOffset : isCSS1Compat ? win.document.documentElement.scrollLeft : win.document.body.scrollLeft
    let y = supportPageOffset ? win.pageYOffset : isCSS1Compat ? win.document.documentElement.scrollTop : win.document.body.scrollTop
    return {
        X: x,
        Y: y
    }
}

export {
    setParentTitle,
    reloadIframeUrl,
    resetLayerOffset,
    getScrollXY
}
