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
    var path, newPathSteps, points;

    points = state.path.length ? state.path : [this.getStart(state.size)];

    newPathSteps =  _.map(points, function (point) {
        return this.getAdjacentFree(point, state.size, state.walls, state.path);
    }.bind(this));

    path = _.uniqWith(_.flatten(newPathSteps), _.isEqual);
    path = state.path.concat(path);

    newPathSteps = [_.flatten(newPathSteps)];

    var pathInSteps = [];
    pathInSteps = pathInSteps.concat(state.pathInSteps);
    console.log('pis', pathInSteps);
    pathInSteps.push(newPathSteps);

    return _.extend({}, state, { path: path }, { pathInSteps: pathInSteps });
}

p.getStart = function (size) {
    return [0, Math.floor(size / 2)];
}

p.getEnd = function (size) {
    return [size - 1, Math.floor(size / 2)];
}

p.getAdjacentFree = function (start, size, walls, path) {
    var notOffGrid = _.partial(this.notOffGrid, size);
    var notWall = _.partial(this.notX, walls);
    var notPath = _.partial(this.notX, path);
    var notStart = function (point) { return !_.isEqual(point, this.getStart(size))}.bind(this);
    return _(this.getAdjacent(start))
            .filter(notWall)
            .filter(notPath)
            .filter(notOffGrid)
            .filter(notStart)
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
