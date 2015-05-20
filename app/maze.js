/*global define, module, require*/
var wrapper = function(minivents, Grid, _) {

    'use strict';
    
    /**
     * The main object of this project. Contains the grid and does the calculations
     * to find the path from A to B.
     *
     * @param {Object} window - The browser window object.
     */
    function Maze(window) {

        this.size = 4;
        this.squareSize = 30;

        this.createCanvas(window.document);
        this.createButton(window.document);
        this.createMapButton(window.document);
        this.createClearButton(window.document);

        this.path = [];

        window.events = new minivents();
        
        this.grid = new Grid(this.size, this.ctx, window, this.squareSize);

    };

    /**
     * Creates the html canvas for drawing onto. Sets handlers for the canvas too.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.createCanvas = function(document) {
        var maze = this;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.squareSize * this.size;
        this.canvas.height = this.squareSize * this.size;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(180, 200, 220)';
        this.ctx.globalAlpha = 1;
        
        this.canvas.onmousemove = this.highlight.bind(this);
        this.canvas.onclick = this.setWall.bind(this);
    };

    /**
     * Translates the mouse x and y into a grid reference for the maze.
     *
     * @param {Number} xPos - The horizontal position of the mouse cursor.
     * @param {Number} yPos - The vertical position of the mouse cursor.
     */
    Maze.prototype.findSquare = function(xPos, yPos) {
        var x = Math.floor(xPos / this.squareSize),
            y = Math.floor(yPos / this.squareSize);

        if (x >= this.size  || y >= this.size) {
            return undefined;
        }

        return {x: x, y: y};
    };

    /**
     * Calls the hover event on the currently hovered-over grid square.
     *
     * @param {Object} event - The mouse move event.
     */
    Maze.prototype.highlight = function(event) {
        var square = this.findSquare(event.x, event.y);
        if (!square) return;

        window.events.emit('hover');
        
        this.grid.grid[square.x][square.y].hover();
    };

    /**
     * Sets a square as being a 'wall' square when clicked on
     *
     * @param {Object} event - The mouse click event.
     */
    Maze.prototype.setWall = function(event) {
        var square = this.findSquare(event.x, event.y);
        if (!square) return;

        this.grid.grid[square.x][square.y].setWall();

    };

    /**
     * Creates the action button on the page to trigger path finding.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.createButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find A Path';
        
        document.body.appendChild(button);

        button.onclick = this.findPath.bind(this);

        this.button = button;
        
    };

    /**
     * Creates the action button on the page to trigger path mapping.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.createMapButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find All Paths';
        
        document.body.appendChild(button);

        button.onclick = this.findAllPaths.bind(this);

        this.mapButton = button;
        
    };

    /**
     * Creates the action button on the page to clear the maze.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.createClearButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Clear';
        
        document.body.appendChild(button);

        button.onclick = this.clear.bind(this);

    };
    
    /**
     * Clears the path by creating a new grid and recreating the walls from the old
     * grid.
     */
    Maze.prototype.clearPath = function() {
        var oldGrid = this.grid;
        this.grid = new Grid(this.size, this.ctx, window, this.squareSize);
        _.each(oldGrid.grid, function(v, i) {
            _.each(v, function (v2, j) {
                if (v2.type === 2) {
                    this.grid.grid[i][j].setWall();
                }
            }.bind(this));
        }.bind(this));
    };

    /**
     * Clears the maze by creating a new grid.
     */
    Maze.prototype.clear = function() {
        this.grid = new Grid(this.size, this.ctx, window, this.squareSize);
    };

    /**
     * Finds the path from A to B by looping through the squares and asking if we've
     * reached the end square yet.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.findPath = function() {
        var start = this.grid.ends.start,
            startingSquare = this.grid.grid[start.x][start.y],
            sqs = [{square: startingSquare}],
            runs = 0,
            found, returned;

        this.clearPath();
        
        while (!found && runs < 100) {
            returned = this.parseWave(this.getAdjacentTo(sqs));
            found = returned.found;
            sqs = returned.sqs;
            runs += 1;
        }

        if (found) {
            this.setPath(found);
        }
    };

    /**
     * Finds all the shortest paths
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.findAllPaths = function() {
        var start = this.grid.ends.start,
            startingSquare = this.grid.grid[start.x][start.y],
            sqs = [{square: startingSquare}],
            runs = 0,
            found, returned;

        var adjacent;

        this.clearPath();
        
        while (sqs.length && runs <= 100) {
            runs++;

            adjacent = this.getAdjacentTo(sqs);
            sqs = this.markWave(adjacent, runs);
            this.logGrid(this.grid);
        }

    };

    /**
     * Returns whether or not the current square is adjacent to the end square.
     *
     * @param {Object} sqObj - The current GridSquare object.
     */
    Maze.prototype.checkFound = function(sqObj) {
        var sq = sqObj.square;
        //if the first item in the queue is the end, winner.
        if (sq.x === this.grid.ends.end.x &&
            sq.y === this.grid.ends.end.y) {
            return sqObj.prevSquare;
        }
        return false;
    };

    /**
     * Loops through the current 'wave' of squares before we can move on to the next
     * wave. This makes sure we parse everything in order.
     *
     * @param {Object} sqs - The current wave (list) of GridSquare objects.
     */
    Maze.prototype.parseWave = function(sqs) {
        var i,
            found = false;
        for (i = 0; i < sqs.length && !found; i++) {
            found = this.checkFound(sqs[i]);
            this.mark(sqs[i]);
        }

        return {found: found, sqs: sqs};
    };

    /**
     * Loops through the current 'wave' of squares before we can move on to the next
     * wave. This makes sure we parse everything in order.
     * Marks each square with the incremental 'wave number'.
     *
     * @param {Object} sqs - The current wave (list) of GridSquare objects.
     */
    Maze.prototype.markWave = function(sqs, run) {
        var i;
        for (i = 0; i < sqs.length; i++) {
            sqs[i] = this.mark(sqs[i], run);
        }

        return sqs;
    };

    /**
     * Marks the current GridSquare object as having been parsed, so we don't parse
     * anything twice.
     *
     * @param {Object} sqObj - The current GridSquare object.
     */
    Maze.prototype.mark = function(sqObj, val) {
        var sq = sqObj.square;
        sq.parsed = true;
        sq.from = sqObj.prevSquare;
        if (val) {
            sq.wave = val;
        }
        return sq;
    };

    /**
     * Finds all the GridSquares adjacent to this one, which haven't already been 
     * parsed
     *
     * @param {Object} sqs - The current wave of GridSquares
     */
    Maze.prototype.getAdjacentTo = function(sqs) {
        var adj = [],
            dirs, i, j, pos, sq;
        for (i = 0; i < sqs.length; i++) {
            dirs = this.getDirs(sqs[i].square);
            for (j = 0; j < dirs.length; j++) {
                pos = dirs[j];
                if (pos.x >= 0 && pos.x < this.grid.size &&
                    pos.y >= 0 && pos.y < this.grid.size) {
                    sq = this.grid.grid[pos.x][pos.y];
                    if (this.validSquare(sq)) {
                        adj.push({
                            square : sq,
                            prevSquare : sqs[i].square
                        });
                    }
                }
            }
        }
        return adj;
    };

    /**
     * Returns the list of possible directions to move from the current square.
     *
     * @param {Object} sqObj - The current GridSquare object.
     */
    Maze.prototype.getDirs = function(sq) {
        return _.shuffle([
            {x: sq.x, y: sq.y - 1}, // Above
            {x: sq.x, y: sq.y + 1}, // Below
            {x: sq.x - 1, y: sq.y}, // Left
            {x: sq.x + 1, y: sq.y}  // Right


            // {x: sq.x - 1, y: sq.y - 1}, // NW
            // {x: sq.x - 1, y: sq.y + 1}, // SW
            // {x: sq.x + 1, y: sq.y + 1}, // SE
            // {x: sq.x + 1, y: sq.y - 1}  // NE
        ]);
    };

    /**
     * Returns whether or not the current square is 'valid' for parsing.
     * Not parsed, not a wall.
     *
     * @param {Object} sq - The current GridSquare object.
     */
    Maze.prototype.validSquare = function(sq) {
        return (!sq.parsed && sq.type !== 2);
    };

    /**
     * Sets the current square as being part of the shortest path.
     *
     * @param {Object} sq -  current GridSquare object.
     */
    Maze.prototype.setPath = function(sq) {
        if (!(sq.x === this.grid.ends.start.x &&
            sq.y === this.grid.ends.start.y)) {
            sq.setType(3);
            this.setPath(this.grid.grid[sq.from.x][sq.from.y]);
        }
    };

    /**
     * Returns whether or not the current square is a square/
     *
     * @param {Object} sq -  current GridSquare object.
     */
    Maze.prototype.isSquare = function(sq) {
        return !!sq;
    };
    
    /**
     * Updates the GridSquare with data such as where the previously parsed square 
     * was.
     *
     * @param {Object} sqObj -  current GridSquare object.
     */
    Maze.prototype.checkSquare = function(sqObj) {
        var sq = sqObj.square,
            prevSq = sqObj.prevSquare;

            sq.parsed = true;
            sq.from.x = prevSq.x;
            sq.from.y = prevSq.y;
            return sq;

    };

    Maze.prototype.getCanvas = function() {
        return this.canvas;
    };
    
    Maze.prototype.getContext = function() {
        return this.ctx;
    };

    Maze.prototype.logGrid = function () {
        console.log('---');
        var grid = this.grid.grid;
        var rotatedGrid = [];
        var rotatedRow = [];
        _.each(grid, function (col, i) {
            rotatedRow = [];
            _.each(col, function (square, j) {
//                console.log(grid[j][i]);
                rotatedRow.push(grid[j][i]);
            });
            console.log(_.pluck(rotatedRow, 'wave'));
            rotatedGrid.push(rotatedRow);
            // console.log(_.map(col, function (square) {
            //     return '[' + (square.wave || ' ') + ']';
            // }));
        });
//        console.log(rotatedGrid);
//        console.log();
    };

    return Maze;

};

if (typeof define !== 'undefined') {
    define(['../vendor/minivents', './grid', '../vendor/lodash.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.Maze = wrapper(require('../vendor/minivents'),
                                      require('./grid').Grid,
							   require('../vendor/lodash'));
    }
}
