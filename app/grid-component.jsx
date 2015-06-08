/*global define, module, require*/
var wrapper = function(React, Square) {

        var Grid = React.createClass({

            types: ['empty', 'ends', 'wall', 'path'], 

            getInitialState: function () {
                return {
                    grid: [
                        [0,0,0,0,0],
                        [0,0,0,0,0],
                        [1,0,0,0,1],
                        [0,0,0,0,0],
                        [0,0,0,0,0],
                    ]
                } 
            },

            render: function () {
                var size = 10;
                var types = this.types;
                var grid = _.map(this.state.grid, function (row) {
                    return (
                        <ol className="row">
                        {_.map(row, function (s) {
                            return (<Square type={types[s]} />);
                        })}
                        </ol>)
                });
                return (
                    <div>{grid}</div>
                );
            }
        });

        return Grid;
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min',
        './square'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'),
            require('./square'));
    }
}
