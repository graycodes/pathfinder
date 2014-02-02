var assert = require('assert'),
    expect = require('expect.js'),
    GridSquare = require('../gridSquare').GridSquare;

suite('Grid Square', function() {
    
    test('should be defined', function() {
        var gs = new GridSquare(1,2,3);
        expect(gs).not.to.be(undefined);
    });

    test('should know where they are', function() {
        var x = 1,
            y = 2, 
            context = {},
            gs = new GridSquare(x, y, context);

        expect(gs.x).to.be(x);
        expect(gs.y).to.be(y);
        expect(gs.ctx).to.be(context);
    });

    test('should render themselves'); 

    test('should know their type (staring, wall, path, empty)');

    test('should listen for hover events');

});
