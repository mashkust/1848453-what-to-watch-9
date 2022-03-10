import FilmCard from './film-card';
import PageFooter from './page-footer';
import {Link} from 'react-router-dom';
import type {Film} from '../types/types';

type MyListProps = {
  films: Film[];
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>
}

function MyListPage({films, setCurrentFilm}: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="main.html" className="logo__link">
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
          {films.map((film: Film) => (
            <FilmCard onHover={function (cardId: number): void {
              throw new Error('Function not implemented.');
            } } {...{ setCurrentFilm, film }} key={film.id}
            />))}
        </div>
      </section>
      <PageFooter />
    </div>
  );
}

export default MyListPage;
