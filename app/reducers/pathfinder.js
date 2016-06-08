var _ = require('lodash');

function Pathfinder() {};

var p = Pathfinder.prototype;

p.toggleWall = function (arr, coords) {
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
}

p.findNext = function (state) {
    // if the state doesn't have any path, then start. Otherwise loop through the latest path queue;
    var adjacentTo = state.path.length === 0 ? this.getStart(state.size) : [0,0];
    return _.extend({}, state, { path: state.path.concat(this.getAdjacentFree(adjacentTo, state.size, state.walls, state.path)) });
}

p.getStart = function (size) {
    return [0, Math.floor(size / 2)];
}

p.getAdjacentFree = function (start, size, walls, path) {
    var notOffGrid = _.partial(this.notOffGrid, size);
    var notWall = _.partial(this.notX, walls);
    var notPath = _.partial(this.notX, path);
    return _(this.getAdjacent(start))
            .filter(notWall)
            .filter(notPath)
            .filter(notOffGrid)
            .value();
}

p.getAdjacent = function (start) {// 0, 1
    var x = start[0];
    var y = start[1];
    return [
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
        [x - 1, y]
    ];
}

p.notOffGrid = function (size, point) {
    var x = point[0];
    var y = point[1];
    return x >= 0 && x < size && y >= 0 && y < size;
}

p.notX = function (walls, point) {
    var intersection = _.intersectionWith(walls, [point], _.isEqual);
    return intersection.length === 0;
}

module.exports = new Pathfinder();
