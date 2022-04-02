import {useAppDispatch} from '../hooks/hooks';
import {changeFavoriteAction} from '../store/api-actions';

type FavoriteButtonProps = {
  id: number;
  isFavorite: boolean;
}

function FavoriteButton({id, isFavorite}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteButtonHandler = () => {
    dispatch(
      changeFavoriteAction({
        filmId: id,
        status: isFavorite ? Number(false) : Number(true),
      }),
    );
  };

  return (
    <button onClick = {() => favoriteButtonHandler()} className="btn btn--list film-card__button" type="button" >
      <svg viewBox = {isFavorite ? '0 0 18 14' : '0 0 19 20'} width = {isFavorite ? '18' : '19'} height= {isFavorite ? '14' : '20'} >
        <use xlinkHref={isFavorite ? '#in-list' : '#add'} >
        </use>
      </svg>
      <span>My list</span>
    </button>
  );
}

export default FavoriteButton;
