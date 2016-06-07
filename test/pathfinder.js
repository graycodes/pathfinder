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
        });
        describe('when called with an empty set of walls', function () {
            it('should return the clicked wall', function () {
                var clicked = [0,0];
                expect(pathfinder.toggleWall([], clicked)).to.deep.equal([clicked]);
            });
        });
        describe('when a disabled wall is clicked', function () {
            it('should return the list of walls, plus the new wall', function () {
                var clicked = [2,2];
                expect(pathfinder.toggleWall([[0,0], [0,1]], clicked)).to.deep.equal([[0,0], [0,1], [2,2]]);
            });
        })
    })

});
