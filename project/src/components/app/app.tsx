import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import LoadingScreen from '../loading-screen';
import AddCard from '../add-card';
import MainCard from '../main-card';
import MoviePages from '../movie-pages';
import MyListPage from '../mylist-page';
import NotFoundPage from '../notfound-page';
import PrivateRoute from '../private-route';
import SignIn from '../signin';
import Player from '../player';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  const isDataLoaded= useAppSelector(({DATA}) => DATA.isDataLoaded);
  const films= useAppSelector(({DATA}) => DATA.films);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainCard/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePages />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddCard films={films}/>}
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
