var redux = require('redux');
var reducers = require('../reducers/index');

module.exports = redux.createStore(reducers);
