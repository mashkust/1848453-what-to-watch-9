import { useState } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
// import {PROMO_FILM} from '../../mocks/films';
import AddCard from '../add-card';
import MainCard from '../main-card';
import MoviePages from '../movie-pages';
import MyListPage from '../mylist-page';
import NotFoundPage from '../notfound-page';
import Player from '../player';
import PrivateRoute from '../private-route';
import SignIn from '../signin';

type Film = {
  name: string,
  poster: string,
  preview: string,
  backgroundImage: string,
  genre: string,
  released: number,
  id: number,
}

type AppScreenProps = {
  promoFilm: Film;
  films: Film[];
}

function App({promoFilm, films}: AppScreenProps): JSX.Element {

  const [currentFilm, setCurrentFilm] = useState<Film | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainCard {...{ setCurrentFilm, promoFilm, films }} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePages setCurrentFilm = {setCurrentFilm} film={currentFilm} similarFilms={films}/>}
        />
        <Route
          path={AppRoute.Player}
          element={<Player/>}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage {...{ setCurrentFilm, films }}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddCard film={currentFilm}/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
