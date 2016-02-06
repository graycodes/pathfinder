var React = require('react');

var Square = React.createClass({

    clickHandler: function (event, id) {
        console.log(arguments, this.props);
	//this.props.clickHandler(event, id);
        this.props.actions.clickSquare([this.props.x, this.props.y]);
    },

    render: function () {
        //	    console.log('render sq', this.props.x, this.props.y, this.props.type);
        var classString = 'square ' + this.props.type;
        return (
            <li className={classString} onClick={this.clickHandler}></li>
        );
    }

});

module.exports = Square;