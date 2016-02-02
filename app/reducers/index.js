var actions = require('../constants/actionTypes');

module.exports = function pathfinding(state, action) {
    switch (action.type) {
        case actions.FIND_PATH:
            return pathfinderService.find(state);
        default:
            return state;
    }
};
