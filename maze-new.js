var wrapper = function(minivents, Grid) {

    'use strict';

    function Debugging(document) {

        this.debug = document.createElement('div');
        this.debug.setAttribute('id', 'debug');

        this.debugStatusBar = document.createElement('div');
        this.debugStatusBar.setAttribute('id', 'debugStatusBar');

        document.body.appendChild(this.debug);
        document.body.appendChild(this.debugStatusBar);

    };

    Debugging.prototype.trace = function trace(str,tabs) {
        var tab = "";
        for (var i=0;i<tabs;i++) {
            tab+="&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        this.debug.innerHTML += tab + str + "<br />";
    };

    Debugging.prototype.traceS = function traceS(str) {
        this.debugStatusBar.innerHTML = str;
    };

    function Maze(window) {

        this.createCanvas(window.document);
        this.createButton(window.document);

        this.debug = new Debugging(window.document);
        this.debug.trace('New Maze!: ');

        this.size = 9;

        this.path = [];

        window.events = new minivents();
        
        this.grid = new Grid(this.size, this.ctx, window);

    };

    Maze.prototype.createCanvas = function(document) {
        var maze = this;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 450;
        this.canvas.height = 450;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(180, 200, 220)';
        this.ctx.globalAlpha = 1;
        
        this.canvas.onmousemove = this.highlight;
        this.canvas.onclick = this.setWall;
    };

    Maze.prototype.findSquare = function(xPos, yPos) {
        var x = Math.floor(xPos / 40),
            y = Math.floor(yPos / 40);

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
    
    Maze.prototype.findPath = function() {
        //starting at the start
        //add the starting square to the list
        var startingSquare = maze.grid.grid[maze.grid.ends.start.x][maze.grid.ends.start.y];

        maze.processQueue(startingSquare);
        maze.addAdjacentTo(startingSquare);
    };

    Maze.prototype.processQueue = function(sq) {
        //if the first item in the queue is the end, winner.
        console.log(sq);
        if (sq.x === maze.grid.ends.end.x &&
            sq.y === maze.grid.ends.end.y) {
            console.log('WINNER');
            return true;
        }
    };

    Maze.prototype.addAdjacentTo = function(sq) {
        var toCheck = [],
            found = false,
            i = 0,
            pos = {x: sq.x, y: sq.y - 1};
        if (pos.x >= 0 && pos.x < maze.grid.size &&
            pos.y >= 0 && pos.y < maze.grid.size) {
            toCheck.push(maze.checkSquare(maze.grid.grid[pos.x][pos.y], sq));
        }
        pos = {x: sq.x, y: sq.y + 1};
        if (pos.x >= 0 && pos.x < maze.grid.size &&
            pos.y >= 0 && pos.y < maze.grid.size) {
            toCheck.push(maze.checkSquare(maze.grid.grid[pos.x][pos.y], sq));
        }
        pos = {x: sq.x - 1, y: sq.y};
        if (pos.x >= 0 && pos.x < maze.grid.size &&
            pos.y >= 0 && pos.y < maze.grid.size) {
            toCheck.push(maze.checkSquare(maze.grid.grid[pos.x][pos.y], sq));
        }
        pos = {x: sq.x + 1, y: sq.y};
        if (pos.x >= 0 && pos.x < maze.grid.size &&
            pos.y >= 0 && pos.y < maze.grid.size) {
            toCheck.push(maze.checkSquare(maze.grid.grid[pos.x][pos.y], sq));
        }

        for (; i < toCheck.length && !found; i++) {
            if (toCheck[i]) {
                found = maze.processQueue(toCheck[i]);
            }
        }
        
        if (found) {
            console.log('winner');
            console.log(toCheck[i-1]);
            maze.setPath(toCheck[i-1]);
        } else {
            for (i = 0; i < toCheck.length; i++) {
                if (toCheck[i]) {
                    maze.addAdjacentTo(toCheck[i]);
                }
            }
        }
        
    };

    Maze.prototype.setPath = function(sq) {
        //set the path back to the start
        sq.setType(3);
        console.log('setting path for ', sq);
        console.log(sq.x, maze.grid.ends.start.x);
        if (!(sq.x === maze.grid.ends.start.x &&
            sq.y === maze.grid.ends.start.y)) {
            console.log(maze.grid.grid[sq.from.x][sq.from.y]);
            maze.setPath(maze.grid.grid[sq.from.x][sq.from.y]);
        }
    };

    Maze.prototype.isSquare = function(sq) {
        return !!sq;
    };
    
    Maze.prototype.checkSquare = function(sq, prevSq) {
        if (!sq.parsed && sq.type !== 2) {
            sq.parsed = true;
            sq.from.x = prevSq.x;
            sq.from.y = prevSq.y;
            return sq;
            //maze.processQueue(sq);
        }
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
    define(['./minivents', './grid'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.Maze = wrapper(require('./minivents'),
                                      require('./grid').Grid);
    }
}
