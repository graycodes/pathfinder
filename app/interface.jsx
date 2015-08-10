/*global define, module, require*/
define(['../vendor/react/react.min',
        '../vendor/lodash/lodash.min'],
function(React, _) {

    var Interface = React.createClass({

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

    return Interface;
});
