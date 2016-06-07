var chai = require('../node_modules/chai/chai');
var expect = chai.expect;
var pathfinder = require('../app/reducers/pathfinder');

describe('Pathfinder', function() {

    it('should be defined', function () {
        expect(pathfinder).to.be.defined;
    });

    describe('toggleWall', function () {
      it('should be defined', function () {
        expect(pathfinder.toggleWall).to.be.defined;
      })
    })

});
