var React = require('react');
var _ = require('lodash');

var Interface = React.createClass({

    componentWillRender: function () {
        console.log('interface will render');
    },

    render: function () {
        return (
            <div>
                <button onClick={this.clickReset}>Reset</button>
                <button onClick={this.clickFind}>Find Path</button>
            </div>
        )
    },

    clickReset: function() {
        this.props.actions.reset();
    },

    clickFind: function() {
        console.log('find');
        this.props.actions.findPath();
    }

});

module.exports = Interface;
