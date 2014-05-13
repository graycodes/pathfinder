var wrapper = function(minivents, Grid) {

    'use strict';
    
    /**
     * The main object of this project. Contains the grid and does the calculations
     * to find the path from A to B.
     *
     * @param {Object} window - The browser window object.
     */
    function Maze(window) {

        this.size = 15;
        this.squareSize = 30;

        this.createCanvas(window.document);
        this.createButton(window.document);
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
        
        this.canvas.onmousemove = this.highlight;
        this.canvas.onclick = this.setWall;
    };

    /**
     * Translates the mouse x and y into a grid reference for the maze.
     *
     * @param {Number} xPos - The horizontal position of the mouse cursor.
     * @param {Number} yPos - The vertical position of the mouse cursor.
     */
    Maze.prototype.findSquare = function(xPos, yPos) {
        var x = Math.floor(xPos / maze.squareSize),
            y = Math.floor(yPos / maze.squareSize);

        if (x >= maze.size  || y >= maze.size) {
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
        var square = maze.findSquare(event.x, event.y);
        if (!square) return;

        window.events.emit('hover');
        
        maze.grid.grid[square.x][square.y].hover();
    };

    /**
     * Sets a square as being a 'wall' square when clicked on
     *
     * @param {Object} event - The mouse click event.
     */
    Maze.prototype.setWall = function(event) {
        var square = maze.findSquare(event.x, event.y);
        if (!square) return;

        maze.grid.grid[square.x][square.y].setWall();

    };

    /**
     * Creates the action button on the page to trigger path finding.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.createButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find Path';
        
        document.body.appendChild(button);

        button.onclick = this.findPath;

        this.button = button;
        
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

        button.onclick = this.clear;

    };
    
    /**
     * Clears the maze by creating a new grid.
     */
    Maze.prototype.clear = function() {
        maze.grid = new Grid(maze.size, maze.ctx, window, maze.squareSize);
    };

    /**
     * Finds the path from A to B by looping through the squares and asking if we've
     * reached the end square yet.
     *
     * @param {Object} document - The window document.
     */
    Maze.prototype.findPath = function() {
        var start = maze.grid.ends.start,
            startingSquare = maze.grid.grid[start.x][start.y],
            sqs = [{square: startingSquare}],
            runs = 0,
            found, returned;
        
        while (!found && runs < 100) {
            returned = maze.parseWave(maze.getAdjacentTo(sqs));
            found = returned.found;
            sqs = returned.sqs;
            runs += 1;
        }

        if (found) {
            maze.setPath(found);
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
        if (sq.x === maze.grid.ends.end.x &&
            sq.y === maze.grid.ends.end.y) {
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
            found = maze.checkFound(sqs[i]);
            maze.mark(sqs[i]);
        }

        return {found: found, sqs: sqs};
    };

    /**
     * Marks the current GridSquare object as having been parsed, so we don't parse
     * anything twice.
     *
     * @param {Object} sqObj - The current GridSquare object.
     */
    Maze.prototype.mark = function(sqObj) {
        var sq = sqObj.square;
        sq.parsed = true;
        sq.from = sqObj.prevSquare;
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
            dirs = maze.getDirs(sqs[i].square);
            for (j = 0; j < dirs.length; j++) {
                pos = dirs[j];
                if (pos.x >= 0 && pos.x < maze.grid.size &&
                    pos.y >= 0 && pos.y < maze.grid.size) {
                    sq = maze.grid.grid[pos.x][pos.y];
                    if (maze.validSquare(sq)) {
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
        return [
            {x: sq.x, y: sq.y - 1}, // Above
            {x: sq.x, y: sq.y + 1}, // Below
            {x: sq.x - 1, y: sq.y}, // Left
            {x: sq.x + 1, y: sq.y}  // Right
        ];
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
        if (!(sq.x === maze.grid.ends.start.x &&
            sq.y === maze.grid.ends.start.y)) {
            sq.setType(3);
            maze.setPath(maze.grid.grid[sq.from.x][sq.from.y]);
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

    return Maze;

};

if (typeof define !== 'undefined') {
    define(['../vendor/minivents', './grid'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.Maze = wrapper(require('../vendor/minivents'),
                                      require('./grid').Grid);
    }
}
