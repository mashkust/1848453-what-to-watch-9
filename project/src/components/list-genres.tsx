import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Link} from 'react-router-dom';
import { resetCountAction, setActiveGenre } from '../store/film-process';

type ListGenresProps = {
  genres: string[],
}

function ListGenres({genres}: ListGenresProps): JSX.Element {
  const activeGenre = useAppSelector(({FILM}) => FILM.activeGenre);
  const dispatch = useAppDispatch();

  return (
    <>
      {genres.map((genre) => (
        <li
          key = {genre} className = {`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}
          onClick = {() => {
            dispatch(setActiveGenre(genre));
            dispatch(resetCountAction());
          }}
        >
          <Link to={' '} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </>
  );
}

export default ListGenres;
