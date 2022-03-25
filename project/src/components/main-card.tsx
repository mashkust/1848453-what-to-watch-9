import React, { useState, useEffect } from 'react';
import FilmCard from './film-card';
import FilmPromo from './film-promo';
import PageFooter from './page-footer';
import ListGenres from './list-genres';
import type {Film} from '../types/types';
import {useAppSelector,useAppDispatch} from '../hooks/hooks';
import { DEFAULT_GENRE } from '../const';
import ShowMoreButtonComponent from './show-more';
import {fetchPromoFilmAction} from '../store/api-actions';


function MainCard(): JSX.Element {
  const promoFilmCard = useAppSelector(({DATA}) => DATA.promoFilm);

  const dispatch = useAppDispatch();
  const initialFilms = useAppSelector(({DATA}) => DATA.films);
  const {
    activeGenre,
    filmCardsCount,
  } = useAppSelector(({FILM}) => FILM);

  const filteredFilms = activeGenre === DEFAULT_GENRE ? initialFilms : initialFilms.filter((film) => film.genre === activeGenre);

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres([DEFAULT_GENRE, ...new Set(initialFilms && initialFilms.map((film) => film.genre))]);
  }, [initialFilms]);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);


  return (
    <React.Fragment>
      <FilmPromo promoFilm={promoFilmCard as Film} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            <ListGenres genres = {genres} />
          </ul>
          <div className="catalog__films-list">
            {filteredFilms && filteredFilms.slice(0, filmCardsCount).map((film: Film) => (
              <FilmCard  {...{film}} key={film.id}/>))}
          </div>
          <div className="catalog__more">
            {filteredFilms && filteredFilms.length > filmCardsCount ? <ShowMoreButtonComponent /> : ''}
          </div>
        </section>
        <PageFooter />
      </div>
    </React.Fragment>
  );
}

export default MainCard;
