/*global require*/

var React = require('react');
var reactDom = require('react-dom');
var _ = require('lodash');
var redux = require('redux');
var Pathfinder = require('./pathfinder.jsx');
var actions = require('./actions/index');

window.p = React.createElement(Pathfinder, {size:3, actions: actions});
reactDom.render(window.p, document.getElementById('pathfinder'));
