import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Film } from '../types/types';
import FilmCard from './film-card';
import PageFooter from './page-footer';
import { Link, useParams } from 'react-router-dom';
import { fetchFilmAction, fetchReviewsAction, fetchSimilarFilmsAction } from '../store/api-actions';
import { AuthorizationStatus } from '../const';
import LoadingScreen from './loading-screen';

function MoviePages(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const filmid = Number(params.id);

  useEffect(() => {
    if (filmid) {
      dispatch(fetchFilmAction(filmid));
      dispatch(fetchSimilarFilmsAction(filmid));
      dispatch(fetchReviewsAction(filmid));
    }
  }, [dispatch, filmid]);

  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);

  const { film, similarFilms } = useAppSelector(({ DATA }) => DATA);

  if (film) {
    const { id, name, posterImage, backgroundImage, genre, released } = film as Film;
    const filteredSimilarFilms = similarFilms?.filter((item) => item.id !== filmid);
    return (
      <React.Fragment>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={backgroundImage} alt={name} />
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
                  <h2 className="film-card__title">{name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{genre}</span>
                    <span className="film-card__year">{released}</span>
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
                    {
                      authorizationStatus === AuthorizationStatus.Auth ?
                        <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
                        : ''
                    }
                  </div>
                </div>
              </div>}
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={posterImage} alt={name} width="218" height="327" />
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
              {filteredSimilarFilms && filteredSimilarFilms.map((el: Film) => (
                <FilmCard film={el} key={el.id} />))}
            </div>
          </section>
          <PageFooter />
        </div>
      </React.Fragment>
    );
  }
  return <LoadingScreen/>;
}
export default MoviePages;

