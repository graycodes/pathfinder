/*global define, module, require*/
var wrapper = function(GridSquare, _) {
    
    function Grid(size, context, window, squareSize) {
        if (!size) throw 'Missing parameter: size';
        this.size = size;
        this.window = window;
        this.ends = {
            start: {
                x: 0,
                y: Math.floor(size / 2)
            },
            end:{
                x: size - 1,
                y: Math.floor(size / 2)
            }
        };
        this.grid = this.createGrid(this.size, context, squareSize);
    };

    Grid.prototype.createGrid = function(size, context, squareSize) {
        var grid = [],
            x,y;
        for (x = 0; x < size; x++) {
            grid[x] = [];
            for (y = 0; y < size; y++) {
                grid[x][y] = new GridSquare(x, y, context, this.window, squareSize);
            }
        }
        
        // Set starting blocks.
        grid[this.ends.start.x][this.ends.start.y].setType(1);
        grid[this.ends.end.x][this.ends.end.y].setType(1);

        return grid;
    };

    return Grid;

};

if (typeof define !== 'undefined') {
    define(['./gridSquare', '/vendor/lodash.min'], wrapper);//remove
} else {
    if (typeof module !== 'undefined') { 
        module.exports.Grid = wrapper(require('./gridSquare').GridSquare, 
				      require('../vendor/lodash.min'));
    }
}
