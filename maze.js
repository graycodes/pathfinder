var wrapper = function(minivents, Grid) {

    'use strict';

    function Maze(window) {

        this.size = 9;
        this.squareSize = 50;

        this.createCanvas(window.document);
        this.createButton(window.document);
        this.createClearButton(window.document);

        this.path = [];

        window.events = new minivents();
        
        this.grid = new Grid(this.size, this.ctx, window, this.squareSize);

    };

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

    Maze.prototype.findSquare = function(xPos, yPos) {
        var x = Math.floor(xPos / maze.squareSize),
            y = Math.floor(yPos / maze.squareSize);

        if (x >= maze.size  || y >= maze.size) {
            return undefined;
        }

        return {x: x, y: y};
    };

    Maze.prototype.highlight = function(event) {
        var square = maze.findSquare(event.x, event.y);
        if (!square) return;

        window.events.emit('hover');
        
        maze.grid.grid[square.x][square.y].hover();
    };

    Maze.prototype.setWall = function(event) {
        var square = maze.findSquare(event.x, event.y);
        if (!square) return;

        maze.grid.grid[square.x][square.y].setWall();

    };

    Maze.prototype.createButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find Path';
        
        document.body.appendChild(button);

        button.onclick = this.findPath;

        this.button = button;
        
    };

    Maze.prototype.createClearButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Clear';
        
        document.body.appendChild(button);

        button.onclick = this.clear;

    };
    
    Maze.prototype.clear = function() {
        maze.grid = new Grid(maze.size, maze.ctx, window, maze.squareSize);
    };

    Maze.prototype.findPath = function() {
        //starting at the start
        //add the starting square to the list
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

    Maze.prototype.checkFound = function(sqObj) {
        var sq = sqObj.square;
        //if the first item in the queue is the end, winner.
        if (sq.x === maze.grid.ends.end.x &&
            sq.y === maze.grid.ends.end.y) {
            return sqObj.prevSquare;
        }
        return false;
    };

    Maze.prototype.parseWave = function(sqs, sq) {
        var i,
            found = false;
        for (i = 0; i < sqs.length && !found; i++) {
            found = maze.checkFound(sqs[i]);
            maze.mark(sqs[i]);
        }

        return {found: found, sqs: sqs};
    };

    Maze.prototype.mark = function(sqObj) {
        var sq = sqObj.square;
        sq.parsed = true;
        sq.from = sqObj.prevSquare;
    };

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

    Maze.prototype.getDirs = function(sq) {
        return [
            {x: sq.x, y: sq.y - 1}, // Above
            {x: sq.x, y: sq.y + 1}, // Below
            {x: sq.x - 1, y: sq.y}, // Left
            {x: sq.x + 1, y: sq.y}  // Right
        ];
    };

    Maze.prototype.validSquare = function(sq) {
        return (!sq.parsed && sq.type !== 2);
    };

    Maze.prototype.setPath = function(sq) {
        if (!(sq.x === maze.grid.ends.start.x &&
            sq.y === maze.grid.ends.start.y)) {
            sq.setType(3);
            maze.setPath(maze.grid.grid[sq.from.x][sq.from.y]);
        }
    };

    Maze.prototype.isSquare = function(sq) {
        return !!sq;
    };
    
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
    define(['./vendor/minivents', './grid'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.Maze = wrapper(require('./vendor/minivents'),
                                      require('./grid').Grid);
    }
}
