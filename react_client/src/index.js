import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// redux stuff
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {}

// not sure if arrow function is ok here
const reducer = (state,action) => {
    return state
}

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store} >
        <App />    
    </Provider>,
    document.getElementById('root')
);
