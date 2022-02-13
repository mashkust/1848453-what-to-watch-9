import React from 'react';
import FilmCard from './film-card';
import FilmPromo from './film-promo';
import PageFooter from './page-footer';

type Film = {
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  genre: string,
  released: number,
  id: number,
}

type MainCardProps = {
  promoFilm: Film;
  films: Film[];
}

function MainCard({promoFilm, films}: MainCardProps): JSX.Element {
  return (
    <React.Fragment>
      <FilmPromo promoFilm={promoFilm} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="/" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="/" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            {films.map((film: Film) => <FilmCard film={film} key={film.id}/>)}
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <PageFooter />
      </div>
    </React.Fragment>
  );
}

export default MainCard;
