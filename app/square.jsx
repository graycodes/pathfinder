var React = require('react');
var _ = require('lodash');

var Square = React.createClass({

    clickHandler: function (event, id) {
        this.props.actions.clickSquare([this.props.x, this.props.y]);
    },

    render: function () {
        var classString = 'square ' + this.props.type + ' ' +
            (this.inFinalPath([this.props.x, this.props.y], this.props.finalPath) ? 'final' : '') +
            ' stepNum' + this.props.step;
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
        var isFinalPath = this.inFinalPath([this.props.x, this.props.y], finalPath);
        var alpha = isFinalPath ? '1' : '0.3';
//        var borderColor = isFinalPath ? 'black' : 'gray';
        var backgroundColor = "hsla(" + hue + ", 75%, 70%, " + alpha + ")";
        return { backgroundColor: backgroundColor/*, borderColor: borderColor*/ };
    },

    inFinalPath: function (point, finalPath) {
        return _.intersectionWith([point], finalPath, _.isEqual).length;
    }

});

module.exports = Square;
