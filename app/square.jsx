/*global define, module, require*/
var wrapper = function(React) {

    var Square = React.createClass({

	clickHandler: function (event, id) {
	    this.props.clickHandler(event, id);
	},

        render: function () {
//	    console.log('render sq', this.props.x, this.props.y, this.props.type);
            var classString = 'square ' + this.props.type;
            return (
                <li className={classString} onClick={this.clickHandler}></li>
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
