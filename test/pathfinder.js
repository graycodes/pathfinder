var _ = require('lodash');
var chai = require('../node_modules/chai/chai');
var expect = chai.expect;
var pathfinder = require('../app/reducers/pathfinder');

describe('Pathfinder', function() {

    it('should be defined', function () {
        expect(pathfinder).to.be.defined;
    });

    describe('toggleWall', function () {

        it('should return the clicked wall when called with an empty set of walls', function () {
            var clicked = [0,0];
            expect(pathfinder.toggleWall([], clicked)).to.deep.equal([clicked]);
        });

        it('should return the list of walls, plus the new wall when a disabled wall is clicked', function () {
            var clicked = [2,2];
            expect(pathfinder.toggleWall([[0,0], [0,1]], clicked)).to.deep.equal([[0,0], [0,1], [2,2]]);
        });

    });

    describe('findNext', function () {
        it('should return a list of points next to the start, given an empty grid', function () {
            var state = { size: 3, walls: [], path: [] };
            expect(pathfinder.findNext(state)).to.deep.equal(_.extend(state, { path: [[0,0], [1,1], [0,2]] }));
        });
        it('should return the right path, with existing path', function () {
            var state = { size: 3, walls: [], path: [ [0,0], [1,1], [0,2] ] };
            console.log(pathfinder.findNext(state).path);
            console.log([ [0,0], [1,1], [0,2], [1,0], [2,1], [2,0] ]);
            expect(pathfinder.findNext(state).path).to.deep.equal([ [0,0], [1,1], [0,2], [1,0], [2,1], [1,2] ]);
        });
    });

    describe('getStart', function () {
        it('should return the start when given a size', function () {
            expect(pathfinder.getStart(3)).to.deep.equal([0, 1]);
            expect(pathfinder.getStart(7)).to.deep.equal([0, 3]);
            expect(pathfinder.getStart(11)).to.deep.equal([0, 5]);
            expect(pathfinder.getStart(99)).to.deep.equal([0, 49]);
        });
    });

    describe('getEnd', function () {
        it('should return the end when given a size', function () {
            expect(pathfinder.getEnd(3)).to.deep.equal([2, 1]);
            expect(pathfinder.getEnd(7)).to.deep.equal([6, 3]);
            expect(pathfinder.getEnd(11)).to.deep.equal([10, 5]);
            expect(pathfinder.getEnd(99)).to.deep.equal([98, 49]);
        });
    });

    describe('getAdjacentFree', function () {
        it('should return the filtered list of adjacent points', function () {
            expect(pathfinder.getAdjacentFree([0,1], 3, [], [])).to.deep.equal([[0,0], [1,1], [0,2]]);
            expect(pathfinder.getAdjacentFree([0,2], 3, [], [])).to.deep.equal([[1,2]]);
            expect(pathfinder.getAdjacentFree([1,1], 3, [], [])).to.deep.equal([[1,0], [2,1], [1,2]]);
            expect(pathfinder.getAdjacentFree([1,1], 3, [[1,0], [2,1], [1,2], [0,1]], [])).to.deep.equal([]);
            expect(pathfinder.getAdjacentFree([1,1], 3, [], [[1,0], [2,1], [1,2], [0,1]])).to.deep.equal([]);
            expect(pathfinder.getAdjacentFree([1,1], 3, [[1,0], [2,1]], [])).to.deep.equal([[1,2]]);
        });
    });

    describe('getAdjacent', function () {
        it('should return the list of adjacent points', function () {
            expect(pathfinder.getAdjacent([0,1])).to.deep.equal([[0,0], [1,1], [0,2], [-1,1]]);
        });
    });

    describe('notOffGrid', function () {
        it('should reject points off grid', function () {
            expect(pathfinder.notOffGrid(3, [-1, 0])).to.equal(false);
            expect(pathfinder.notOffGrid(3, [0, -1])).to.equal(false);

            expect(pathfinder.notOffGrid(3, [-9, 0])).to.equal(false);
            expect(pathfinder.notOffGrid(3, [0, -7])).to.equal(false);

            expect(pathfinder.notOffGrid(3, [10, 0])).to.equal(false);
            expect(pathfinder.notOffGrid(3, [0, 10])).to.equal(false);

            expect(pathfinder.notOffGrid(10, [11, 0])).to.equal(false);
            expect(pathfinder.notOffGrid(10, [0, 11])).to.equal(false);

            expect(pathfinder.notOffGrid(10, [0, 0])).to.equal(true);
            expect(pathfinder.notOffGrid(10, [1, 1])).to.equal(true);
            expect(pathfinder.notOffGrid(10, [2, 2])).to.equal(true);
        });
    })

    describe('notX', function () {
        it('should reject points which are in X', function () {
            expect(pathfinder.notX([[1,1], [2,2], [3,3]], [1,1])).to.equal(false);
            expect(pathfinder.notX([[1,1], [2,2], [3,3]], [2,2])).to.equal(false);

            expect(pathfinder.notX([[1,1], [2,2], [3,3]], [1,2])).to.equal(true);
            expect(pathfinder.notX([[1,1], [2,2], [3,3]], [4,2])).to.equal(true);
            expect(pathfinder.notX([[1,1], [2,2], [3,3]], [2,7])).to.equal(true);
        });
    });

    describe('pointsAreEqual', function () {
        it('should compare points', function () {
            expect(pathfinder.pointsAreEqual([0,0], [0,0])).to.equal(true);
            expect(pathfinder.pointsAreEqual([1,2], [1,2])).to.equal(true);
            expect(pathfinder.pointsAreEqual([3,7], [3,7])).to.equal(true);

            expect(pathfinder.pointsAreEqual([0,1], [0,0])).to.equal(false);
            expect(pathfinder.pointsAreEqual([3,1], [2,2])).to.equal(false);
            expect(pathfinder.pointsAreEqual([4,1], [1,7])).to.equal(false);
        });
    })

});
