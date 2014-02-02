var assert = require('assert'),
    expect = require('expect.js'),
    GridSquare = require('../gridSquare').GridSquare,
    window = require('jsdom').jsdom().parentWindow,
    ctx = window.document.createElement('canvas').getContext('2d'),
    Events = require('../minivents');

window.events = new Events();

suite('Grid Square', function() {

    test('should be defined', function() {
        var gs = new GridSquare(1,2,ctx,window);
        expect(gs).not.to.be(undefined);
    });

    test('should know where they are', function() {
        var x = 1,
            y = 2, 
            context = ctx,
            gs = new GridSquare(x, y, context, window);

        expect(gs.x).to.be(x);
        expect(gs.y).to.be(y);
        expect(gs.ctx).to.be(context);
    });

    test('should render themselves', function() {
        // don't think that's testable
    }); 

    test('should know their type', function() {
        expect(new GridSquare(1, 2, ctx, window).type).to.be(0);
    });

    test('should listen for hover events');

});
