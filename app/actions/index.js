var types = require('../constants/actionTypes');

module.exports = {
    findPath: function () {
        console.log('findPath Action');
        return { type: types.FIND_PATH };
    },

    reset: function () {
        return { type: types.RESET };
    },

    clickSquare: function (coords) {
        return { type: types.CLICK_SQUARE, coords: coords };
    }
};
