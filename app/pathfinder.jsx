var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    render: function () {
        return (
                <div>
	                <Grid size={this.props.size} walls={this.props.walls} path={this.props.path} steps={this.props.steps} actions={this.props.actions} />
	                <Interface actions={this.props.actions} />
                </div>
        );
    }
})

module.exports = Pathfinder;
