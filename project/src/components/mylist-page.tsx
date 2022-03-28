import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { fetchFavoriteAction } from '../store/api-actions';
import { Film } from '../types/types';
import FilmCard from './film-card';
import PageFooter from './page-footer';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  const favoriteFilms = useAppSelector(({DATA}) => DATA.favorite);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/Linkvatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to="/" className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favoriteFilms && favoriteFilms.map((film: Film) => (
            <FilmCard  {...{film}} key={film.id}/>))}
        </div>
      </section>
      <PageFooter />
    </div>
  );
}

export default MyListPage;

