import React from 'react';
import FilmCard from './film-card';
import PageFooter from './page-footer';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../const';

type Film = {
  name: string,
  poster: string,
  preview: string,
  backgroundImage: string,
  genre: string,
  released: number,
  id: number,
  review: string;
}

type MovieProps = {
  film: Film | null;
  similarFilms: Film[];
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>
}

function MoviePages({ film, similarFilms, setCurrentFilm }: MovieProps): JSX.Element {
  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={ film ? film.backgroundImage:''} alt={ film ? film.name :''} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/Linkvatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to="/login" className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>
          {film &&
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <Link to={generatePath(AppRoute.AddReview, { id: String(film.id) })} className="btn film-card__button">Add review</Link>
                </div>
              </div>
            </div>}
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film ? film.poster : ''} alt={film ? film.name : ''} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <Link to="/" className="film-nav__link">Overview</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to="/" className="film-nav__link">Details</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to="/" className="film-nav__link">Reviews</Link>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score"></div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">Very good</span>
                  <span className="film-rating__count"> ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&#39;s friend and protege.</p>

                <p>Gustave prides himself on providing first-className service to the hotel&#39;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&#39;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>

                <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>

                <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similarFilms.map((similarFilm: Film) => <FilmCard setCurrentFilm = {setCurrentFilm} film={similarFilm} key={similarFilm.id} />)}
          </div>
        </section>
        <PageFooter />
      </div>
    </React.Fragment>
  );
}

export default MoviePages;
