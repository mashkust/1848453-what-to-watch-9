type Film = {
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  genre: string,
  released: number,
  id: number,
}

type FilmPromoProps = {
  promoFilm: Film;
};

function FilmPromo({promoFilm}: FilmPromoProps): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <a href="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a href="/" className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmPromo;
