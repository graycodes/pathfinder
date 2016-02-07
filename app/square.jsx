var React = require('react');

var Square = React.createClass({

    clickHandler: function (event, id) {
        this.props.actions.clickSquare([this.props.x, this.props.y]);
    },

    render: function () {
        var classString = 'square ' + this.props.type;
        return (
            <li className={classString} onClick={this.clickHandler}></li>
        );
    }

});

module.exports = Square;