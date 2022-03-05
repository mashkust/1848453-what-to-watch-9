import {Link, generatePath} from 'react-router-dom';
import {AppRoute} from '../const';

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

type FilmCardProps = {
  film: Film;
  setCurrentFilm:React.Dispatch<React.SetStateAction<Film | null>>
};

function FilmCard({film, setCurrentFilm}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.preview} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link onClick={() => setCurrentFilm(film)} to={generatePath(AppRoute.Film,{id: String(film.id)})} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
