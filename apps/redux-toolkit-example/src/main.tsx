import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
