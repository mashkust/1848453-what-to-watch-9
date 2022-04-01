import React from 'react';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { AppRoute, AuthorizationStatus, RATING_VALUES } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUserData, sendReviewAction } from '../store/api-actions';
import { sendReview } from '../store/film-data';
import { setErrorText } from '../store/user-process';
import type {Film} from '../types/types';
import UserPage from './user-page';

type AddReviewProps = {
  films:Film [];
};

function AddCard({films}: AddReviewProps): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const film = films.find((somefilm) => somefilm.id === Number(params.id));

  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
    dispatch(fetchUserData());
  }, [navigate, authorizationStatus, dispatch]);

  const errorText = useAppSelector(({USER}) => USER.errorText);
  const isReviewSending = useAppSelector(({DATA}) => DATA.isDataSending);
  const [rating, setRating] = useState<number>(1);
  const [text, setText] = useState('');
  const [isRating, setIsRating] = useState<boolean>(false);

  const ratingChangeHandler = (userRating: number) => {
    setRating(userRating);
    setIsRating(true);
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film ? film.backgroundImage:''} alt={film ? film.name :''} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__el">
                <Link to="film-page.html" className="breadcrumbs__link">{ film ? film.name :''}</Link>
              </li>
              <li className="breadcrumbs__el">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserPage />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={ film ? film.posterImage:''} alt={ film ? film.name :''} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form onSubmit={(evt: React.FormEvent<HTMLFormElement>)=> {
          evt.preventDefault();
          dispatch(sendReview(true));
          dispatch(sendReviewAction({
            filmId: Number(params.id as string),
            comment: text,
            rating: rating,
          }));
          navigate(`/films/${params.id}`);
        }} action="#" className="add-review__form"
        >
          <div className="rating">
            <div className="rating__stars">
              {RATING_VALUES.map((el) => (
                <React.Fragment key={el.value}>
                  <input className = "rating__input"  key = {el.value} id = {`star-${el.value}`} type = "radio"
                    name = "rating" value = {el.value} checked = {rating === el.value}
                    onChange = {(evt) => ratingChangeHandler(Number(evt.target.value))} disabled = {isReviewSending}
                  />
                  <label className = "rating__label" htmlFor = {`star-${el.value}`}>
                    Rating {el.value}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="add-review__text">
            <textarea value={text} onChange = {(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
              setText(evt.currentTarget.value);
              if  (text.length < 50 || text.length > 400) {
                dispatch( setErrorText({ text: 'Отзыв должен содержать от 50 до 400 символов. Поставьте оценку.'}));}
              else {
                dispatch( setErrorText({ text:null}));
              }
            }}className="add-review__textarea" name="review-text" id="review-text" placeholder="Введите..." disabled = {isReviewSending}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled = {text.length < 50 || text.length > 400 || !isRating || isReviewSending}>Post</button>
            </div>
          </div>
          {errorText && <p className='add-review__textarea'> {errorText} </p>}
        </form>
      </div>
    </section>
  );
}

export default AddCard;


