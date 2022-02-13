import MainCard from '../main-card';

type Film = {
  name: string,
  posterImage: string,
  previewImage: string,
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
  return <MainCard promoFilm={promoFilm} films={films} />;
}

export default App;
