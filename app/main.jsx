/*global require*/

require([
    '../vendor/react/react.min',
    './pathfinder',
    '../vendor/lodash/lodash.min'
], function(React, Pathfinder, _) {
    window.p = React.createElement(Pathfinder, {size:21});
    React.render(window.p, document.getElementById('pathfinder'));

});
