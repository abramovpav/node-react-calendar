import { applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();

const middleware = routerMiddleware(history);
// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);
export const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(middleware, thunk)));