import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import TemplateComponent from './components/TemplateComponent';
import reducers from './reducers';
                                  // initial state
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <TemplateComponent />
  </Provider>
  , document.getElementById('app'));
