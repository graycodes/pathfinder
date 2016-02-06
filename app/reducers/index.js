var actions = require('../constants/actionTypes');
var initialState = require('../constants/initialState');

module.exports = function pathfinding(state, action) {
    switch (action.type) {
        case actions.FIND_PATH:
            return pathfinderService.find(state);
        case actions.RESET:
            return initialState;
        case actions.CLICK_SQUARE:
            return {
                size: state.size,
                walls: toggleWall(state.walls, action.coords),
                path: state.path
            };
        default:
            return state;
    }
};

function toggleWall(arr, coords) {
    console.log('toggleWall', arr, coords);
    var filtered = arr.filter(function (pair) {
        return !(pair[0] === coords[0] && pair[1] === coords[1]);
    });
    if (filtered.length === arr.length) {
        arr.push(coords)
        return arr;
    } else {
        return filtered;
    }
};
