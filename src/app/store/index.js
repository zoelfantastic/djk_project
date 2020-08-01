import { combineReducers } from 'redux';
import history from "./history";
import prod_configureStore, { rootReducers as prod_rootReducers } from './store.prod';

const configureStore =  prod_configureStore ;
const rootReducers =  prod_rootReducers;

const store = configureStore();

function injectReducer(newReducer, overwrite = true) {
    if (overwrite === true) {
        store.additionalReducer = newReducer;
    } else {
        store.additionalReducer = Object.assign(store.additionalReducer, newReducer);
    }
    const reducers = store.additionalReducer ?
                        combineReducers({ ...rootReducers, ...store.additionalReducer }) :
                        combineReducers(rootReducers);
    store.replaceReducer(reducers)
}

export { history, injectReducer };
export default store;