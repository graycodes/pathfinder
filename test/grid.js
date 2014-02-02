var assert = require('assert'),
    expect = require('expect.js'),
    GridSquare = require('../gridSquare').GridSquare,
    Grid = require('../grid').Grid;

suite('Grid', function() {
    
    test('should be defined', function() {
        var g = new Grid(6);
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
            g = new Grid(size);
        expect(g.size).to.be(size);
    });

    test('should contain an array of gridSquares', function() {
        var size = 9,
            g = new Grid(size);
        expect(g.grid.length).to.be(size);
    });
    
    test('should populate the array of gridSquares', function() {
        var size = 4,
            g = new Grid(size);
        expect(g.createGrid(size).length).to.be(size);
    });

    test('should inform squares of their state');

    test('should calculate the state of the squares');

});
