var assert = require('assert'),
    expect = require('expect.js'),
    GridSquare = require('../gridSquare').GridSquare,
    Grid = require('../grid').Grid,
    window = require('jsdom').jsdom().parentWindow,
    ctx = window.document.createElement('canvas').getContext('2d'),
    Events = require('../minivents');

window.events = new Events();

suite('Grid', function() {
    
    test('should be defined', function() {
        var g = new Grid(6, ctx, window);
        expect(g).not.to.be(undefined);
    });

    test('should throw an error if size isn\'t passed in', function() {
        var createGrid = function() {
            return new Grid();
        };
        expect(createGrid).to.throwException();
    });

    test('should have a size, passed in.', function() {
        var size = 9,
            g = new Grid(size, ctx, window);
        expect(g.size).to.be(size);
    });

    test('should contain an array of gridSquares', function() {
        var size = 9,
            g = new Grid(size, ctx, window);
        expect(g.grid.length).to.be(size);
    });
    
    test('should populate the array of gridSquares', function() {
        var size = 4,
            g = new Grid(size, ctx, window);
        expect(g.createGrid(size, ctx).length).to.be(size);
    });

    test('should inform squares of their state');

    test('should calculate the state of the squares');

});
