import React from 'react';
import FilmCard from './film-card';
import FilmPromo from './film-promo';
import PageFooter from './page-footer';
import {Link} from 'react-router-dom';
import type {Film} from '../types/types';

type MainCardProps = {
  promoFilm: Film;
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>;
  setFilmsState: React.Dispatch<React.SetStateAction<Film[] | null>>;
  filmsState: Film[]  | null;

}

function MainCard({promoFilm, setCurrentFilm, setFilmsState, filmsState}: MainCardProps): JSX.Element {
  const onHoverHandler=(id:number, isMouseLeave:boolean) => {
    setFilmsState((prev: Film[]|null) => {
      if (prev) {
        const newState= prev?.slice(0);
        newState?.forEach((film)=> {
          film.isActive = isMouseLeave ? false : film.id ===id;
        });
        return newState;
      }
      return prev;
    });
  };
  return (
    <React.Fragment>
      <FilmPromo promoFilm={promoFilm} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <Link to="/" className="catalog__genres-link">All genres</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Comedies</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Crime</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Documentary</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Dramas</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Horror</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Kids & Family</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Romance</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Sci-Fi</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="/" className="catalog__genres-link">Thrillers</Link>
            </li>
          </ul>

          <div className="catalog__films-list">
            {filmsState && filmsState.map((film: Film) => (
              <FilmCard onHover={onHoverHandler} {...{ setCurrentFilm, film }} key={film.id}/>))}
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
