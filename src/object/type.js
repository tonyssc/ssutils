const Type = {
    isPrototype(para) {
        return Object.prototype.toString.call(para).toLowerCase();
    },
    isArray(para) {
        return Array.isArray(para) || this.isPrototype(para) === '[objetc array]';
    },
    isObject(para) {
        return this.isPrototype(para) === '[object object]';
    },
    isFunction(para) {
        return this.isPrototype(para) === '[object function]';
    },
    isString(para) {
        return typeof para === 'string';
    },
    isNumber(para) {
        return typeof para === 'number';
    },
    isUndefined(para) {
        return typeof para === 'undefined';
    },
    isJSON(para) {
        try {
            JSON.parse(para);
        } catch (e) {
            return false;
        }
        return true;
    },
    isNull(para) {
        return this.isPrototype(para) === '[object null]';
    }
};

module.exports = { Type };
