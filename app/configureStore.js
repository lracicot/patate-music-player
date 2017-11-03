import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
import actionMiddleware from './App/app.action_middleware';

export const history = createBrowserHistory();
const router = routerMiddleware(history);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const enhancer = composeEnhancers(applyMiddleware(thunk, router, actionMiddleware));

/**
 * configureStore - Create a store and set the correct configurations
 *
 * @param {Map} initialState The initial state of the application
 *
 * @return {Store} The store holding the state (Redux)
 */
export const configureStore = initialState =>
  createStore(reducer, initialState, enhancer);
