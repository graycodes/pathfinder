/*global define, module, require*/
var wrapper = function(React) {
    return function () {

        var Square = React.createClass({
            render: function () {
                return (
                    <li>HELLO MUM</li>
                );
            }
        });

        var _generateRow = function (size) {
            return _.map(_.range(size), function (num) {
                return (<Square/>);
            });
        };

        var Grid = React.createClass({

            render: function () {
                var size = 10;
                var grid = _.map(_.range(size), function () {
                    return (<ol>{_generateRow(size)}</ol>);
                });
                return (
                    <div>{grid}</div>
                );
            }
        });

        React.render(<Grid/>, document.getElementById('react-mount-point'))
    };
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'));
    }
}
