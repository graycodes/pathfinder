/*global define, module, require*/
define(['../vendor/react/react.min',
        '../vendor/lodash/lodash.min',
        '../vendor/minivents'],
function (React, _, minivents) {

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

    return Interface;
});
