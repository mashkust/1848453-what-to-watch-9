import { RATING } from '../../const';
import { Film } from '../../types/types';

type OverviewTabProps = {
  film: Film | object,
}

const getRating = (rating: number) => {
  if (rating < 3) {
    return RATING.BAD;
  }
  if (rating < 5) {
    return RATING.NORMAL;
  }
  if (rating < 8) {
    return RATING.GOOD;
  }
  if (rating < 10) {
    return RATING.VERY_GOOD;
  }
  return RATING.AWESOME;
};

function Overview({film}: OverviewTabProps): JSX.Element {
  const { rating, scoresCount, description, director, starring} = film as Film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(rating)}</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring?.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default Overview;
