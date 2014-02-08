var assert = require('assert'),
    expect = require('expect.js'),
    jsdom  = require('jsdom').jsdom,
    window = jsdom().parentWindow,
    Maze   = require('../maze').Maze,
    Grid   = require('../grid.js').Grid,
    Events = require('../vendor/minivents');

window.events = new Events();

suite('The Maze', function() {

    test('should be a valid object', function() {
        expect(Maze).to.be.a('function');
    });

    test('should not throw when constructing', function() {
        var constrMaze  = function() {
            return new Maze(window);
        };

        expect(constrMaze).not.to.throwException();

    });
    
    test('should have a canvas', function() {
        var maze = new Maze(window);
        expect(maze.getCanvas()).to.be.an('object');
    });

    test('should have a context', function() {
        var maze = new Maze(window);
        expect(maze.getContext()).to.be.an('object');

        expect(maze.getContext().fillStyle).not.to.be(undefined);
        expect(maze.getContext().globalAlpha).not.to.be(undefined);
    });

    test('should have a grid', function() {
        var maze = new Maze(window);
        expect(maze.grid instanceof Grid).to.be(true);
    });
});
