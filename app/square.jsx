/*global define, module, require*/
var wrapper = function(React) {
    return function () {

        var Square = React.createClass({

            getClass: function (type) {
                return ['empty', 'ends', 'wall', 'path'][type];
            },

            logShit: function (thing) {
                console.log('foo', thing); 
            },

            getInitialState: function () {
                return {
                    type: 'empty'
                };
            },

            render: function () {
                var classString = 'square ' + this.getClass(this.props.type);
 
                return (
                    <li className={classString} onClick={this.logShit}></li>
                );
            }
        });

        var Grid = React.createClass({

            getInitialState: function () {
                return {
                    grid: [
                        [0,0,0],
                        [0,0,0],
                        [0,0,0],
                    ]
                } 
            },

            render: function () {
                var size = 10;
                var grid = _.map(this.state.grid, function (row) {
                    return (
                        <ol className="row">
                        {_.map(row, function () {
                            return (<Square />);
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
