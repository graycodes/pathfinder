/*global require*/

var React = require('react');
var reactDom = require('react-dom');
var _ = require('lodash');
var redux = require('redux');
var Pathfinder = require('./pathfinder');

window.p = React.createElement(Pathfinder, {size:21});
console.log(window.p);
reactDom.render(window.p, document.getElementById('pathfinder'));
console.log(redux);
