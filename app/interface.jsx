var React = require('react');
var _ = require('lodash');

var Interface = React.createClass({

    componentWillRender: function () {
        console.log('interface will render');
    },

    render: function () {
        return (
            <div className="interface">
                <h1>Pathfinder</h1>

                <button onClick={this.clickReset}>Reset</button>
                <button onClick={this.clickFind}>Find Path</button>
                <button className="hide" onClick={this.clickFindNext}>Find Next</button>
            </div>
        )
    },

    clickReset: function() {
        this.props.actions.reset();
    },

    clickFind: function() {
        console.log('find');
        this.props.actions.findPath();
    },

    clickFindNext: function() {
        console.log('findNext');
        this.props.actions.findNext();
    }

});

module.exports = Interface;
