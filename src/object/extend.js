const Type = require('./type');

let extend = function(defaults, options) {
    let result = defaults || {};
    for (let i in options) {
        if (Type.isObject(options[i])) {
            result[i] = extend(result[i], options[i]);
        } else {
            result[i] = options[i];
        }
    }
    return result;
};

module.exports = { extend };
