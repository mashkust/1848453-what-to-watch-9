import React, { useState, useEffect } from 'react';
import FilmCard from './film-card';
import FilmPromo from './film-promo';
import PageFooter from './page-footer';
import ListGenres from './list-genres';
import type {Film, State} from '../types/types';
import {useAppSelector,useAppDispatch} from '../hooks/hooks';
import { DEFAULT_GENRE } from '../const';


type MainCardProps = {
  promoFilm: Film;
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>;
  setFilmsState: React.Dispatch<React.SetStateAction<Film[] | null>>;
  filmsState: Film[]  | null;
}

function MainCard({promoFilm, setCurrentFilm, setFilmsState, filmsState}: MainCardProps): JSX.Element {

  const activeGenre = useAppSelector((state: State) => state.activeGenre);

  const filteredFilms = activeGenre === DEFAULT_GENRE ? filmsState :filmsState && filmsState.filter((film) => film.genre === activeGenre);

  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres([DEFAULT_GENRE, ...new Set(filmsState && filmsState.map((film) => film.genre))]);
  }, [dispatch, filmsState]);

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
            <ListGenres genres = {genres} />
          </ul>

          <div className="catalog__films-list">
            {filteredFilms && filteredFilms.map((film: Film) => (
              <FilmCard onHover={onHoverHandler} {...{ setCurrentFilm, film}} key={film.id}/>))}
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
