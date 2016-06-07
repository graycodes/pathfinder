var actions = require('../constants/actionTypes');
var initialState = require('../constants/initialState');

module.exports = function pathfinding(state, action) {
    switch (action.type) {
        case actions.FIND_PATH:
            console.log('findPath reducer');
            return state;
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
    var newWalls = [];

    // Remove the wall if it's in arr
    var filtered = arr.filter(function (pair) {
        return !(pair[0] === coords[0] && pair[1] === coords[1]);
    });

    // If the wall wasn't in arr, add it in
    // Otherwise, return the list minus the wall
    if (filtered.length === arr.length) {
        newWalls = newWalls.concat(arr);
        newWalls = newWalls.concat([coords]);
        return newWalls;
    } else {
        return filtered;
    }
};
