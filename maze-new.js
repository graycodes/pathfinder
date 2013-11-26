(function (document) {
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

    function Maze(document) {

        this.createCanvas(document);
        this.createButton(document);

        this.debug = new Debugging(document);
        this.debug.trace('New Maze!: ');
        
        this.createGrid();

    };

    Maze.prototype.createCanvas = function(document) {

        this.canvas = document.createElement('canvas');
        this.canvas.width = 450;
        this.canvas.height = 450;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(180, 200, 220)';
        this.ctx.globalAlpha = 1;
        
    };

    Maze.prototype.createButton = function(document) {

        var button = document.createElement('button');
        button.innerHTML = 'Find Path';
        
        document.body.appendChild(button);
        
    };
    
    Maze.prototype.createGrid = function() {
        var x = 0,
            y = 0,
            gridSize = 9;
        this.grid = [];
        for (; x < gridSize; x++) {
            this.grid[x] = [];
            for (y = 0; y < gridSize; y++) {
                this.grid[x][y] = 0;
            }
        }
        return this.grid;
    };
    
    Maze.prototype.getCanvas = function() {
        return this.canvas;
    };
    
    Maze.prototype.getContext = function() {
        return this.ctx;
    };

    if (typeof module != 'undefined') {
        module.exports.Maze = Maze;
    } else {
        var m = new Maze(window.document);
    }

    return Maze;

}());
