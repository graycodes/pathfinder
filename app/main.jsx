var React = require('react');
var reactDom = require('react-dom');
var _ = require('lodash');
var redux = require('redux');
var Provider = require('react-redux').Provider;
var Pathfinder = require('./pathfinder.jsx');
var actions = require('./actions/index');
var initialState = require('./constants/initialState');
var configureStore = require('./stores/index');
var App = require('./containers/app');

var store = configureStore();



window.p = React.createElement(Pathfinder, {state: initialState, actions: actions});


reactDom.render(
    <Provider store={store}>
    	<App />
    </Provider>,
    document.getElementById('pathfinder')
);
