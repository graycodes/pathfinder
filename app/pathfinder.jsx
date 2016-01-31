var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    getInitialState: function () {
        return {
            size: 21,
        }
    },

    componentWillMount: function () {
        console.log('cwm');
        document.getElementById('btn').addEventListener('click', function () {
            this.setState(function (s, p) {
                return {size: s.size + 1};
            });
            console.log('clicked', this.state);
        }.bind(this));
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
