var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    render: function () {
        return (
                <div>
	                <Interface actions={this.props.actions} />
	                <Grid size={this.props.size} walls={this.props.walls} path={this.props.path} steps={this.props.steps} actions={this.props.actions} finalPath={this.props.finalPath} />
                </div>
        );
    }
})

module.exports = Pathfinder;
