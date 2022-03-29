import {Link, generatePath} from 'react-router-dom';
import {AppRoute} from '../const';
// import { PREVIEW_TIMEOUT } from '../const';
import VideoPlayer from './video-player';
import type {Film} from '../types/types';
import { fetchFilmAction } from '../store/api-actions';
import { store } from '../store';
import { setActiveFilm } from '../store/film-data';
import { useAppDispatch } from '../hooks/hooks';

type FilmCardProps = {
  film: Film;
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { videoLink, previewImage, isActive, id,name} = film;

  return (
    <article
      onMouseEnter={
        () => {
          dispatch(setActiveFilm({ id: film.id, isMouseOver: false}));
          // setTimeout(() => {
          //   // eslint-disable-next-line no-console
          //   console.log('onMouseEnter');
          // setActiveFilm({ id: film.id, isMouseOver: false});
          // }, PREVIEW_TIMEOUT);
        }
      }
      onMouseLeave={
        () => {
          dispatch(setActiveFilm({ id: id, isMouseOver: true}));
        }
      }
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <VideoPlayer
          src={videoLink}
          posterImage={previewImage}
          isActive={!!isActive}
          isPreview
        />
      </div>
      <h3 className="small-film-card__title">
        <Link onClick={() => store.dispatch(fetchFilmAction(id)) } to={generatePath(AppRoute.Film,{id: String(id)})} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
