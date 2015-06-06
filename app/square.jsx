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
                } else if ( this.state.type === 'wall' ) {
                    this.setState({ type: 'empty' });
                }
            },

            getInitialProps: function () {
                return {
                    type: 'empty'
                }
            },

            getInitialState: function () {
                console.log(this.props);
                return {
                    type: this.props.type
                };
            },

            render: function () {
                var classString = 'square ' + this.state.type;
 
                return (
                    <li className={classString} onClick={this.toggleWall}></li>
                );
            }
        });

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

        React.render(<Grid/>, document.getElementById('react-mount-point'))

        window.Gridly = Grid;
    };
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'));
    }
}
