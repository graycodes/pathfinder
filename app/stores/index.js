var redux = require('redux');
var reducers = require('../reducers/index');
var initialState = require('../constants/initialState');

function configureStore() {
    return redux.createStore(reducers, initialState, 
        window.devToolsExtension ? window.devToolsExtension() : undefined
	);
};

module.exports = configureStore;
