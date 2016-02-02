var _ = require('lodash');
var GridSquare = require('./gridSquare');

function Grid(size, context, window, squareSize) {
    if (!size) throw 'Missing parameter: size';
    this.size = size.size;
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
        x = 0,y = 0;
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

module.exports = Grid;
