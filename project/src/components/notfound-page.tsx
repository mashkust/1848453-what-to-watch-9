import {Link} from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p><Link to="/">Главная страница</Link></p>
    </>
  );
}

export default NotFoundPage;
