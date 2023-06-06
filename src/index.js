import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import firebase from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () =>
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <Provider
          store={createStoreWithMiddleware(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__()
          )}
        >
          <App />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  );

render();
