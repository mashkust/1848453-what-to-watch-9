import { useAppDispatch } from '../hooks/hooks';
import { incCountAction } from '../store/action';

function ShowMoreButtonComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button
      className="catalog__button"
      type="button"
      onClick = {() => dispatch(incCountAction())}
    >
      Show more
    </button>
  );
}

export default ShowMoreButtonComponent;
