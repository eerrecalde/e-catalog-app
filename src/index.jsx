import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { I18nextProvider } from 'react-i18next';
import $ from 'jquery/dist/jquery.slim.min'; // eslint-disable-line
// import 'flag-icon-css/';
import config from './aws-exports';
import i18n from './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.scss';
import Loading from './components/loading/loading';

Amplify.configure(config);

ReactDOM.render(
  <Suspense fallback={(<Loading />)}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Suspense>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
