import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux stuff
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'

// thunk
import ReduxThunk from 'redux-thunk'

let middlewares = [ applyMiddleware(ReduxThunk) ]

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push( window.__REDUX_DEVTOOLS_EXTENSION__() )
}

const middleware = compose(...middlewares)

const store = createStore(
    rootReducer,
    middleware
)

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);
