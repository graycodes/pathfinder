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

        var gridState = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];

        var Grid = React.createClass({
            render: function () {
                var size = 10;
                var grid = _.map(gridState, function (row) {
                    return (
                        <ol>
                        {_.map(row, function (square) {
                            return (<Square/>);
                        })}
                        </ol>)
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
