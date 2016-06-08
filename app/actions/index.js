var types = require('../constants/actionTypes');

module.exports = {
    findPath: function () {
        console.log('findPath Action');
        return { type: types.FIND_PATH };
    },

    findNext: function () {
        console.log('findNext action');
        return { type: types.FIND_NEXT };
    },

    reset: function () {
        return { type: types.RESET };
    },

    clickSquare: function (coords) {
        return { type: types.CLICK_SQUARE, coords: coords };
    }
};
