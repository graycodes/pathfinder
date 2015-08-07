/*global define, module, require*/
var wrapper = function(React, _, Square) {

        var Grid = React.createClass({

            types: ['empty', 'ends', 'wall', 'path'], 

	    buildGrid: function () {
                var size = this.props.size;
                var grid = _.map(_.range(size), function (x) {
                    var row = _.map(_.range(size), function (y) {
                        return {
                            type: 0,
                            parsed: 0,
                            x: x,
                            y: y
                        }
                    });
                    return row;
                });
		grid[10][0].type = 1;
		grid[~~(size / 2)][size - 1].type = 1;
		return grid;
	    },

            render: function () {
		console.log('grid props', this.props);
		var grid = this.buildGrid();
                var types = this.types;

                grid = _.map(grid, function (row) {
                    return (
                        <ol className="row">
                        {_.map(row, function (s) {
                            return (<Square type={types[s.type]} />);
                        })}
                        </ol>)
                });


                return (
                    <div>{grid}</div>
                );
            },

            /**
             * Finds all the GridSquares adjacent to this one, which haven't already been 
             * parsed
             *
             * @param {Object} sqs - The current wave of GridSquares
             */
            getAdjacentTo: function(sqs) {
                var adj = [],
                dirs, i, j, pos, sq;
                for (i = 0; i < sqs.length; i++) {
                    dirs = this.getDirs(sqs[i].square);
                    for (j = 0; j < dirs.length; j++) {
                        pos = dirs[j];
                        if (pos.x >= 0 && pos.x < this.state.grid.length &&
                            pos.y >= 0 && pos.y < this.state.grid.length) {
                            sq = this.state.grid[pos.x][pos.y];
                            if (this.validSquare(sq)) {
                                adj.push({
                                    square : sq,
                                    prevSquare : sqs[i].square
                                });
                            }
                        }
                    }
                }
                return adj;
            },

            /**
             * Returns the list of possible directions to move from the current square.
             *
             * @param {Object} sqObj - The current GridSquare object.
             */
            getDirs: function(sq) {
                return _.shuffle([
                    {x: sq.x, y: sq.y - 1}, // N
                    {x: sq.x, y: sq.y + 1}, // S
                    {x: sq.x - 1, y: sq.y}, // W
                    {x: sq.x + 1, y: sq.y}  // E
                ]);
            },

            /**
             * Returns whether or not the current square is 'valid' for parsing.
             * Not parsed, not a wall.
             *
             * @param {Object} sq - The current GridSquare object.
             */
            validSquare: function(sq) {
                return (!sq.parsed && sq.type !== 2);
            }

        });

        return Grid;
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min',
        '../vendor/lodash.min',
        './square'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'),
            require('../vendor/lodash.min'),
            require('./square'));
    }
}
