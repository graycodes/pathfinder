module.exports = {
    toggleWall: function (arr, coords) {
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

}
