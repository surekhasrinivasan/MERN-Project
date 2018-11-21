import { createStore, applyMiddleware } from 'redux';
import thunk from 'react-thunk';

const middleware = [thunk];

const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;