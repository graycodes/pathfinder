/*global define, module, require*/
var wrapper = function(React, _) {

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
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min',
        '../vendor/lodash.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'),
            require('../vendor/lodash.min'));
    }
}
