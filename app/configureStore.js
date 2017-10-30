import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
import actionMiddleware from './App/app.action_middleware';

export const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, actionMiddleware);

export const configureStore = initialState =>
  createStore(reducer, initialState, enhancer);
