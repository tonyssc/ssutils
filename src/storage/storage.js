const allowedStoreType = ['sessionStorage', 'localStorage'];

function createStorageApi(storeType) {
    if (allowedStoreType.indexOf(storeType) === -1) {
        throw new Error('storeType is not supported!');
    }

    return {
        get: function (key) {
            let val = window[storeType].getItem(key);

            try {
                val = JSON.parse(val);
            } catch (e) {
            }

            return val;
        },
        set: function (key, value) {
            let val = value;

            if (typeof value === 'object') {
                try {
                    val = JSON.stringify(val);
                } catch (e) {
                }
            }

            return window[storeType].setItem(key, val);
        },
        remove: function (key) {
            return window[storeType].removeItem(key);
        }
    };
}

module.exports = {
    session: createStorageApi('sessionStorage'),
    local: createStorageApi('localStorage')
};
