import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userDataSelector } from '../../store/user-process/selectors.ts';
import { AppRoute } from '../../const.ts';
import { logoutAction } from '../../store/api-actions.ts';

export function AuthHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link className="user-block__avatar" to={AppRoute.MyList}>
          <img
            src={userData?.avatarUrl}
            alt="User avatar"
            width="63"
            height="63"
            style={{
              borderRadius: 100,
              width: '63px',
              height: '63px',
            }}
          />
        </Link>
      </li>
      <li className="user-block__item">
        <a
          className="user-block__link"
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          Sign out
        </a>
      </li>
    </ul>
  );
}
