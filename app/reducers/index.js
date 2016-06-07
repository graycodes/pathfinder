var actions = require('../constants/actionTypes');
var initialState = require('../constants/initialState');
var pathfinder = require('./pathfinder');

module.exports = function pathfinding(state, action) {
    switch (action.type) {
        case actions.FIND_PATH:
            console.log('findPath reducer');
            // Here, we need to do some heavy lifting
            return state;
        case actions.RESET:
            return initialState;
        case actions.CLICK_SQUARE:
            return {
                size: state.size,
                walls: pathfinder.toggleWall(state.walls, action.coords),
                path: state.path
            };
        default:
            return state;
    }
};
