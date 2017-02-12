var actions = require('../constants/actionTypes');
var initialState = require('../constants/initialState');
var pathfinder = require('./pathfinder');

module.exports = function pathfinding(state, action) {
    switch (action.type) {
        case actions.FIND_PATH:
            console.log('findPath reducer');
            // Here, we need to do some heavy lifting
            return pathfinder.findPath(state);
        case actions.FIND_NEXT:
            return pathfinder.nextStep(state);
        case actions.RESET:
            return initialState;
        case actions.CLICK_SQUARE:
            return _.extend({}, state, {walls: pathfinder.toggleWall(state.walls, action.coords)});
        default:
            return state;
    }
};
