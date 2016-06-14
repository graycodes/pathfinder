var React = require('react');

var Square = React.createClass({

    clickHandler: function (event, id) {
        this.props.actions.clickSquare([this.props.x, this.props.y]);
    },

    render: function () {
        var classString = 'square ' + this.props.type;
        var style = this.generateColour(this.props.step);

        return (
            <li className={classString} onClick={this.clickHandler} style={style}></li>
        );
    },

    generateColour: function (step) {
        if (step == undefined) {
            return {};
        }
        var hue = (this.props.step * 25.5) % 255;
        var backgroundColor = "hsl(" + hue + ", 75%, 70%)";
        return { backgroundColor: backgroundColor };
    }

});

module.exports = Square;
