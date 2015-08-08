/*global require*/
require([
    '../vendor/react/react.min',
    './pathfinder'
], function(React, Pathfinder) {
    window.p = React.createElement(Pathfinder, {size:21});
    React.render(window.p, document.getElementById('pathfinder'));
});
