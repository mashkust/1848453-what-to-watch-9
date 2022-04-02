import {Link, useNavigate} from 'react-router-dom';
import { AppRoute } from '../const';
import type {Film} from '../types/types';
import FavoriteButton from './favorite-button';
import UserPage from './user-page';

type FilmPromoProps = {
  promoFilm: Film;
};

function FilmPromo({promoFilm}: FilmPromoProps): JSX.Element {
  const { name, genre, released, posterImage, backgroundImage, id, isFavorite} = promoFilm;
  const navigate = useNavigate();

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <UserPage/>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button" onClick = {() => navigate(`/player/${id}`)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <FavoriteButton {...{id, isFavorite}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmPromo;
