import { useAppDispatch } from '../hooks/hooks';
import { incCountAction } from '../store/film-process';

function ShowMore(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button className="catalog__button" type="button" onClick = {() => dispatch(incCountAction())}>
      Show more
    </button>
  );
}

export default ShowMore;
