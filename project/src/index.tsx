import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {PROMO_FILM, FILMS} from './mocks/films';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promoFilm={PROMO_FILM}
        films={FILMS}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
