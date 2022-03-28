import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { logoutAction } from '../store/api-actions';

function UserPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                  onClick = {() => navigate(AppRoute.MyList)}
                />
              </div>
            </li>
            <li className="user-block__item">
              <Link
                className="user-block__link"
                to = {''}
                onClick = {() => dispatch(logoutAction())}
              >
                Sign out
              </Link>
            </li>
          </>
          :
          <li className="user-block__item">
            <Link
              className="user-block__link"
              to={AppRoute.SignIn}
            >
              Sign in
            </Link>
          </li>
      }
    </ul>
  );
}

export default UserPage;
