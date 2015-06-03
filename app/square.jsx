/*global define, module, require*/
var wrapper = function(React) {
    return function () {

        var Square = React.createClass({

            getClass: function (type) {
                return ['empty', 'ends', 'wall', 'path'][type];
            },

            render: function () {
                var classString = 'square ' + this.getClass(this.props.type);

                return (
                    <li className={classString}></li>
                );
            }
        });

        var Grid = React.createClass({

            getInitialState: function () {
                return {
                    grid: [
                        [0,0,0],
                        [1,2,1],
                        [0,0,0],
                    ]
                } 
            },

            render: function () {
                var size = 10;
                var grid = _.map(this.state.grid, function (row) {
                    return (
                        <ol className="row">
                        {_.map(row, function (square) {
                            return (<Square type={square} />);
                        })}
                        </ol>)
                });
                return (
                    <div>{grid}</div>
                );
            }
        });

        React.render(<Grid/>, document.getElementById('react-mount-point'))
    };
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'));
    }
}
