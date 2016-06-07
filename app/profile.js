import React from 'react';
import reactDom from 'react-dom';
import _ from 'lodash';
import redux from 'redux';
import Provider from 'react-redux'.Provider;
import actions from './actions/index.js';
import initialState from './constants/initialState.jsx';
import configureStore from './stores/index.jsx';
import Profile from './containers/profile.jsx';
import store from configureStore();

reactDom.render(
    <Provider store={store}>
    	<Profile />
    </Provider>,
    document.getElementById('list')
);
