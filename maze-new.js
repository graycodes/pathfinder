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

        window.events = new minivents();
        
        this.grid = new Grid(this.size, this.ctx, window);

    };

    Maze.prototype.createCanvas = function(document) {
        var maze;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 450;
        this.canvas.height = 450;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(180, 200, 220)';
        this.ctx.globalAlpha = 1;
        
        maze = this;

        this.canvas.onmousemove = this.highlight;
        this.canvas.onclick = this.setWall;

    };

    Maze.prototype.findSquare = function(xPos, yPos) {
        var x = Math.floor(xPos / 40),
            y = Math.floor(yPos / 40);

        if (x >= maze.size  || y >= maze.size) {
            return;
        }

        return {x: x, y: y};
    };

    Maze.prototype.highlight = function(event) {
        var square = maze.findSquare(event.x, event.y);
        if (!square) return;

        window.events.emit('hover');
        
        maze.grid.grid[square.x][square.y].hover();
    };

    Maze.prototype.setWall

    Maze.prototype.createButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find Path';
        
        document.body.appendChild(button);
        
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
