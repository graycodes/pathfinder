var Grid = require('../app/grid').Grid;
var chai = require('../node_modules/chai');
var expect = chai.expect;

describe('Grid', function() {
    
    it('should be defined', function() {
        var g = new Grid(6, ctx, window);
        expect(g).not.to.be(undefined);
    });

    it('should throw an error if size isn\'t passed in', function() {
        var createGrid = function() {
            return new Grid();
        };
        expect(createGrid).to.throwException();
    });

    it('should have a size, passed in.', function() {
        var size = 9,
            g = new Grid(size, ctx, window);
        expect(g.size).to.be(size);
    });

    it('should contain an array of gridSquares', function() {
        var size = 9,
            g = new Grid(size, ctx, window);
        expect(g.grid.length).to.be(size);
    });
    
    it('should populate the array of gridSquares', function() {
        var size = 4,
            g = new Grid(size, ctx, window);
        expect(g.createGrid(size, ctx).length).to.be(size);
    });

});
