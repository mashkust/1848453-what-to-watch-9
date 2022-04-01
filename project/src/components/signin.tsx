import { useRef, FormEvent, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {loginAction} from '../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../const';
import { AuthData } from '../types/types';
import PageFooter from './page-footer';
import { setErrorText } from '../store/user-process';

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [navigate, authorizationStatus]);

  const errorText = useAppSelector(({USER}) => USER.errorText);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const patt= new RegExp ('^(?=.*[0-9])(?=.*[a-z])|(?=.*[A-Z]).{2,}$');
    if(
      loginRef.current !== null &&
      passwordRef.current !== null &&
      patt.test(passwordRef.current.value)
    ) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      navigate(AppRoute.Main);
    } else {
      dispatch( setErrorText({ text: 'Пароль должен содержать минимум одну букву и цифру.'}));
      setTimeout(() => {
        dispatch( setErrorText({ text:null}));
      }, 4000);
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Link to={AppRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit = {handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref = {loginRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref = {passwordRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              {errorText && <p className='sign-in_message'> {errorText} </p>}
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <PageFooter />
    </div>
  );
}

export default SignIn;
