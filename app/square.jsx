/*global define, module, require*/
var wrapper = function(React) {
    return function () {
        console.log('square');

        var Square = React.createClass({
            render: function () {
                return (
                    <p>HELLO MUM</p>
                );
            }
        });

        React.render(<Square/>, document.getElementById('react-mount-point'))
    };
};

if (typeof define !== 'undefined') {
    define(['../vendor/react/react.min'], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper(require('../vendor/react/react.min'));
    }
}
