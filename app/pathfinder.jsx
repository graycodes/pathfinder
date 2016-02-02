var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    getInitialState: function () {
        return {
            size: this.props.size,
        }
    },

    componentWillMount: function () {

    },

    render: function () {
        console.log('pathfinder render', this.state.size);
        return (
                <div>
                <Grid size={this.state.size}/>
                <Interface />
                </div>
        );
    }
})

module.exports = Pathfinder;
