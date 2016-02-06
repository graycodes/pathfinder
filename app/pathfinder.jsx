var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    getInitialState: function () {
        console.log('props', this.props);
        return this.props.state;
    },

    render: function () {
        console.log('pathfinder render', this.state.size);
        return (
                <div>
	                <Grid size={this.state.size} walls={this.state.walls} actions={this.props.actions} />
	                <Interface actions={this.props.actions} />
                </div>
        );
    }
})

module.exports = Pathfinder;
