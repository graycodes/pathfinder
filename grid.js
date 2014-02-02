var wrapper = function(GridSquare) {
    
    function Grid(size, context, window) {
        if (!size) throw 'Missing parameter: size';
        this.size = size;
        this.window = window;
        this.grid = this.createGrid(this.size, context);// TODO better name?
    };

    Grid.prototype.createGrid = function(size, context) {
        var grid = [],
            x,y;
        for (x = 0; x < size; x++) {
            grid[x] = [];
            for (y = 0; y < size; y++) {
                grid[x][y] = new GridSquare(x, y, context, this.window);
            }
        }        
        return grid;
    };

    return Grid;

};

if (typeof define !== 'undefined') {
    define(['./gridSquare'], wrapper);    
} else {
    if (typeof module !== 'undefined') { 
        module.exports.Grid = wrapper(require('./gridSquare').GridSquare);
    }
}
