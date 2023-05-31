import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const store = createStore(rootReducer);

store.dispatch({ type: 'ADD_TODO', text: 'use Redux' });
console.log('store.getState', store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () =>
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        {/* <Provider store={createStoreWithMiddleware(rootReducer)}> */}

        <App
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
        {/* </Provider> */}
      </React.StrictMode>
    </BrowserRouter>
  );

render();
store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
