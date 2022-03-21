import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {AppRoute} from '../../const';
import type {Review} from '../../types/types';
import AddCard from '../add-card';
import MainCard from '../main-card';
import MoviePages from '../movie-pages';
import MyListPage from '../mylist-page';
import NotFoundPage from '../notfound-page';
import Player from '../player';
import PrivateRoute from '../private-route';
import LoadingScreen from '../loading-screen';
import SignIn from '../signin';

type AppScreenProps = {
  reviews: Review[];
}

function App({reviews}: AppScreenProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);
  const films = useAppSelector((state) => state.films);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  // const [currentFilm, setCurrentFilm] = useState<Film | null>(null);
  // const [filmsState,  setFilmsState] = useState<Film[]| null> (films);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainCard {...{ filmsState, setFilmsState, setCurrentFilm, promoFilm}} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />film,filmsState, setFilmsState,setCurrentFilm
        <Route
          path={AppRoute.Film}
          element={<MoviePages {...{ filmsState, setCurrentFilm, setFilmsState}} film={currentFilm} />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player {...{films}}/>}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage {...{ filmsState, setCurrentFilm, setFilmsState}}/>
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
