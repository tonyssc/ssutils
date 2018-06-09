/**
 * @file 对象相关方法
 * @date 2018-02-28
 * @author sunshaocheng
 */

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
const deepClone = (values) => {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (values == null || typeof values !== 'object') return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (let i of values) {
            copy[i] = deepClone(i);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (let attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
};

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
const isEmptyObject = (obj) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) { return false }
    return !Object.keys(obj).length;
};

module.exports = { deepClone, isEmptyObject };
