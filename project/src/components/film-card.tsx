import {Link, generatePath} from 'react-router-dom';
import {AppRoute} from '../const';
import { PREVIEW_TIMEOUT } from '../mocks/films';
import VideoPlayer from './video-player';
import type {Film} from '../types/types';

type FilmCardProps = {
  film: Film;
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>
  onHover: (cardId: number, isMouseLeave:boolean) => void;
}


function FilmCard({film,onHover, setCurrentFilm}: FilmCardProps): JSX.Element {
  return (
    <article
      onMouseEnter={
        () => {
          setTimeout(() => {
            onHover(film.id, false);
          }, PREVIEW_TIMEOUT);
        }
      }
      onMouseLeave={
        () => {
          onHover(film.id, true);
        }
      }
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <VideoPlayer
          src={film.videoLink}
          posterImage={film.preview}
          isActive={!!film.isActive}
          isPreview
        />
      </div>
      <h3 className="small-film-card__title">
        <Link onClick={() => setCurrentFilm(film)} to={generatePath(AppRoute.Film,{id: String(film.id)})} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
