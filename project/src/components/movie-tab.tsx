import {Link} from 'react-router-dom';
import {useState} from 'react';
import { Film, Review } from '../types/types';
import Overview from './movie-tabs/overview';
import Details from './movie-tabs/details';

type MovieTabProps = {
  film: Film | object,
  reviews: Review[],
}

type Tab = {
  id: number;
  title: string;
}

function MovieTab({film, reviews}: MovieTabProps): JSX.Element {
  const movieTab: Tab[] = [
    {
      id: 1,
      title: 'Overview',
    },
    {
      id: 2,
      title: 'Details',
    },
    {
      id: 3,
      title: 'Reviews',
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {movieTab.map((tab) => (
            <li
              key = {tab.id}
              className = {`film-nav__item ${activeTab === tab.id ? 'film-nav__item--active' : ''}`}
              onClick = {() => handleClick(tab.id)}
            >
              <Link
                to={'#'}
                className="film-nav__link"
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {activeTab === 1 && <Overview film = {film} />}
      {activeTab === 2 && <Details film = {film} />}
      {/* {activeTab === 3 && <Reviews reviews = {reviews} />} */}
    </>
  );
}

export default MovieTab;
