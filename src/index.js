import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import getRoutes from './routes'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categories', 'products'],
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store)

ReactDOM.render(
  <div className="content">
    <div className="container">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getRoutes()}
        </PersistGate>
      </Provider>
    </div>
  </div>,
  document.getElementById('root')
);
