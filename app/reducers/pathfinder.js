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
    var path;
    if (state.path.length > 0) {
        path =  _.map(state.path, function (point) {
            return this.getAdjacentFree(point, state.size, state.walls, state.path);
        }.bind(this));
        path = _.uniqWith(_.flatten(path), _.isEqual);
        return _.extend({}, state, {path: state.path.concat(path)});
    }
    return _.extend({}, state, { path: state.path.concat(this.getAdjacentFree(adjacentTo, state.size, state.walls, state.path)) });
}

p.getStart = function (size) {
    return [0, Math.floor(size / 2)];
}

p.getAdjacentFree = function (start, size, walls, path) {
    var notOffGrid = _.partial(this.notOffGrid, size);
    var notWall = _.partial(this.notX, walls);
    var notPath = _.partial(this.notX, path);
    var notStart = function (point) { return !(point[0] === 0 && point[1] === 3) };
    return _(this.getAdjacent(start))
            .filter(notWall)
            .filter(notPath)
            .filter(notOffGrid)
//            .filter(notStart)
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

p.pointsAreEqual = function (pointA, pointB) {// TODO: remove
    return pointA[0] === pointB[0] && pointA[1] === pointB[1];
}

module.exports = new Pathfinder();
