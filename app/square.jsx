/*global define, module, require*/
var wrapper = function(React) {

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

        clicked: function () {

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
                <li className={classString} onClick={this.clicked}></li>
            );
        }
    });

    return Square;
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'));
    }
}
