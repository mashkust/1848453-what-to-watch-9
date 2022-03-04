import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {PROMO_FILM, FILMS} from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App
      promoFilm={PROMO_FILM}
      films={FILMS}
    />
  </React.StrictMode>,
  document.getElementById('root'));
