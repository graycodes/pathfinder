var Maze = require('../app/maze').Maze;
var Grid = require('../app/grid.js').Grid;
var chai = require('../node_modules/chai/chai');
var expect = chai.expect;

describe('The Maze', function() {

    it('should be defined', function () {
        expect(Maze).to.be.defined;
    });

});
