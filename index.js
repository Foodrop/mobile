import Expo from 'expo';
import React from 'react';
import App from './src/App'

// redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// Amplify
import config from './aws-exports'
import Amplify from 'aws-amplify'
Amplify.configure(config);

const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )

Expo.registerRootComponent(ReduxApp);