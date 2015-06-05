/*global define, module, require*/
var wrapper = function(React) {
    return function () {

        var Square = React.createClass({

            getClass: function (type) {
                return ['empty', 'ends', 'wall', 'path'][type];
            },

            toggleWall: function () {
                if ( this.state.type === 'empty' ) {
                    this.setState({ type: 'wall' });
                    console.log('made wall');
                }
            },

            getInitialState: function () {
                return {
                    type: 'empty'
                };
            },

            render: function () {
                console.log(this.state);
                var classString = 'square ' + this.state.type;
 
                return (
                    <li className={classString} onClick={this.toggleWall}></li>
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
