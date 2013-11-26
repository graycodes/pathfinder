var assert = require('assert'),
    expect = require('expect.js'),
    GridSquare = require('../gridSquare').GridSquare;

suite('Grid Square', function() {
    
    test('should be defined', function() {
        var gs = new GridSquare(1,2,3);
        expect(gs).not.to.be(undefined);
    });

    test('should save the state you pass in', function() {
        var x = 1,
            y = 2, 
            hoverState = 3,
            gs = new GridSquare(x, y, hoverState);

        expect(gs.x).to.be(x);
        expect(gs.y).to.be(y);
        expect(gs.hoverState).to.be(hoverState);
    });

});
