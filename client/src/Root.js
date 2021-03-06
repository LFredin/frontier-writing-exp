import React from 'react';
import {Provider} from 'react-redux';
//import store from './store';
import reduxPromise from 'redux-promise';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; //index

import stateValidator from 'middlewares/developmentStateValidation';
//const initialState = {};

const middleware = [thunk, reduxPromise, stateValidator];

//wrap other components
export default ({children, initialState = {} })=>{

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware)
    ));

    return(
        <Provider store = { 
           store
        }>
            {children} 
        </Provider>
    );
}




