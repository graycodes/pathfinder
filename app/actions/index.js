var types = require('../constants/actionTypes');

module.exports = {
    findPath: function () {
        return { type: types.FIND_PATH };
    }
};
