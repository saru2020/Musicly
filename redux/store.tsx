import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);