import {Link} from 'react-router-dom';
import { AppRoute } from '../const';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p><Link to={AppRoute.Main}>Главная страница</Link></p>
    </>
  );
}

export default NotFoundPage;
