var React = require('react');
var _ = require('lodash');
var Square = require('./square.jsx');

var Grid = React.createClass({

    types: ['empty', 'ends', 'wall', 'path'],

    buildGrid: function () {
        var size = this.props.size;
        var grid = _.map(_.range(size), function (y) {
            var row = _.map(_.range(size), function (x) {
                return {
                    type: 0,
                    parsed: 0,
                    x: x,
                    y: y
                };
            }.bind(this));
            return row;
        }.bind(this));

        _.map(this.props.walls, function (w) {
            grid[w[0]][w[1]].type = 2;
        });

        _.map(this.props.path, function (w) {
            grid[w[0]][w[1]].type = 3;
        });

        _.map(this.props.path, function (w) {
            var step = -1;
            this.props.steps.forEach(function (s, i) {
                var thing = s[0];
                var otherThing = [w];

                if (_.intersectionWith(thing, otherThing, _.isEqual).length) {
                    step = i;
                }
            });

            if (step !== -1) {
                grid[w[0]][w[1]].step = step;
            }
        }.bind(this));

        grid[0][~~(size / 2)].type = 1;
        grid[size - 1][~~(size / 2)].type = 1;

        return grid;
    },

    toggleWall: function (square, event, id) {
        var currSq = this.state.grid[square.x][square.y];
        var newType;

        if (currSq.type === 0) {
            newType = this.types.indexOf('wall');
        } else if (currSq.type === 2) {
            newType = this.types.indexOf('empty');
        }

        if (typeof newType !== 'undefined') {
            this.setState(function (state, p) {
                state.grid[square.x][square.y].type = newType;
                return state;
            });
        }
    },

    // getInitialState: function () {
    //     return {
    //         grid: this.buildGrid()
    //     };
    // },

    render: function () {
        var grid = this.buildGrid();
        var types = this.types;

        var self = this;
        var gridFlipped = [];

        for (var y = 0; y < grid.length; y++) {
            gridFlipped[y] = [];
        }

        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid.length; y++) {
                gridFlipped[y][x] = grid[x][y];
            }
        }

        grid = _.map(gridFlipped, function (row, index1) {
            return (<ol className="row" key={index1}>
                {_.map(row, function (s, index2) {
                    return (<Square
                        type={types[s.type]}
                        clickHandler={this.toggleWall.bind(this, s)}
                        x={index2}
                        y={index1}
                        key={index2}
                        step={s.step}
                        finalPath={this.props.finalPath}
                        actions={this.props.actions}
                    />);
                }.bind(this))}
            </ol>)
        }.bind(this));

        return (
            <div className="grid">{grid}</div>
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

module.exports = Grid;
