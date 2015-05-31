var Grid = require('../app/grid').Grid;
var chai = require('../node_modules/chai/chai');
var expect = chai.expect;

describe('Grid', function() {
    
    it('should be defined', function () {
        expect(Grid).to.be.defined;
    });

});
