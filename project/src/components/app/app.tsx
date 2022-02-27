import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainCard from '../main-card';
import SignIn from '../sign-in';
import Player from '../player';
import MoviePages from '../movie-page';
import AddCard from '../add-review';
import NotFoundPage from '../notfound-page';
import PrivateRoute from '../private-route';
import MyListPage from '../mylist-page';

type Film = {
  name: string,
  poster: string,
  preview: string,
  backgroundImage: string,
  genre: string,
  released: number,
  id: number,
}

const PROMO_FILM: Film =
{
  name: 'The Grand Budapest Hotel',
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
  preview: 'https://9.react.pages.academy/static/film/preview/revenant.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  genre: 'Drama',
  released: 2014,
  id: 1,
};

type AppScreenProps = {
  promoFilm: Film;
  films: Film[];
}

function App({promoFilm, films}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainCard promoFilm={promoFilm} films={films}/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePages film={PROMO_FILM} similarFilms={films}/>}
        />
        <Route
          path={AppRoute.Player}
          element={<Player/>}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddCard film={PROMO_FILM}/>}
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
