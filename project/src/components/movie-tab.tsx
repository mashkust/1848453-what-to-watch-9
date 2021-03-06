import {Link} from 'react-router-dom';
import {useState} from 'react';
import { Film, Review } from '../types/types';
import Overview from './movie-tabs/overview';
import Details from './movie-tabs/details';
import Reviews from './movie-tabs/reviews';
import { movieTab } from '../const';

type MovieTabProps = {
  film: Film | object,
  reviews: Review[],
}

function MovieTab({film, reviews}: MovieTabProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {movieTab.map((tab) => (
            <li key = {tab.id} className = {`film-nav__item ${activeTab === tab.id ? 'film-nav__item--active' : ''}`} onClick = {() => handleClick(tab.id)}>
              <Link to={'#'} className="film-nav__link"  >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {activeTab === 1 && <Overview film = {film} />}
      {activeTab === 2 && <Details film = {film} />}
      {activeTab === 3 && <Reviews reviews = {reviews} />}
    </>
  );
}

export default MovieTab;
