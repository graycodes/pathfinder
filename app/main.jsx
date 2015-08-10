/*global require*/
require.config({
    paths: {
 	lodash: '../vendor/lodash/lodash.min',
    },
});

require([
    '../vendor/react/react.min',
    './pathfinder',
    '../vendor/lodash/lodash.min'
], function(React, Pathfinder, _) {
    window.p = React.createElement(Pathfinder, {size:21});
    React.render(window.p, document.getElementById('pathfinder'));
});
