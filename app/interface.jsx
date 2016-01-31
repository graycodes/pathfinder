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
        console.log('reset');
    },

    clickFind: function() {
        console.log('find');
    }

});

module.exports = Interface;
