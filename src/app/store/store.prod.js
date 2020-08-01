import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import history from './history';
import rootReducers from "./app-reducers";

const reduxRouterMiddleware = routerMiddleware(history);
const middlewares = [reduxRouterMiddleware, thunk].filter(Boolean);

function configureStore(initialState) {
    const store = createStore(
        combineReducers(rootReducers),
        initialState,
        applyMiddleware(...middlewares)
    );
    return store;
}

export { rootReducers };
export default configureStore;