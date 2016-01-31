/*global require*/

var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Pathfinder = require('./pathfinder');

window.p = React.createElement(Pathfinder, {size:21});
console.log(window.p);
React.render(window.p, document.getElementById('pathfinder'));
console.log(redux);
