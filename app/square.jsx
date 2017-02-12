var React = require('react');
var _ = require('lodash');

var Square = React.createClass({

    clickHandler: function (event, id) {
        this.props.actions.clickSquare([this.props.x, this.props.y]);
    },

    render: function () {
        var classString = 'square ' + this.props.type;
        var style = this.generateColour(this.props.step, this.props.finalPath);

        return (
            <li className={classString} onClick={this.clickHandler} style={style}></li>
        );
    },

    generateColour: function (step, finalPath) {
        if (step == undefined) {
            return {};
        }
        var hue = (this.props.step * 12.25);
        var alpha = this.inFinalPath([this.props.x, this.props.y], finalPath) ? '1' : '0.5';
        var backgroundColor = "hsla(" + hue + ", 75%, 70%, " + alpha + ")";
        return { backgroundColor: backgroundColor };
    },

    inFinalPath: function (point, finalPath) {
        console.log('ifp', point, finalPath);
        return _.intersectionWith([point], finalPath, _.isEqual).length;
    }

});

module.exports = Square;
