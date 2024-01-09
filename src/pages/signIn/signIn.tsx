import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer.tsx';
import { HeaderWrap as Header, HeaderType } from '../../components/header';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FetchUserData } from '../../types/fetchUserData.ts';
import { loginAction } from '../../store/api-actions.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import {
  authorizationStatusSelector,
  errorUserDataSelector,
} from '../../store/userProcess/selectors.ts';

type LoginType = {
  userEmail: string;
  userPassword: string;
  userEmailError: boolean;
  userPasswordError: boolean;
};

function SignIn(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const authorizationError = useAppSelector(errorUserDataSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginType>({
    userEmail: '',
    userPassword: '',
    userEmailError: false,
    userPasswordError: false,
  });
  const [messageError, setMessageError] = useState<string[] | null>(null);
  const loginChange = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    if (evt.target) {
      const { name, value } = evt.currentTarget;
      setLoginData({ ...loginData, [name]: value, [`${name}Error`]: false });
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    if (authorizationError.property.length) {
      if (authorizationError.property.includes('password')) {
        setLoginData({ ...loginData, userPasswordError: true });
      }
      if (authorizationError.property.includes('email')) {
        setLoginData({ ...loginData, userEmailError: true });
      }
      setMessageError(authorizationError.messages);
    }
  }, [authorizationError.messages, authorizationError.property, authorizationError.property.length, loginData]);

  const onSubmit = (authData: FetchUserData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginData.userEmail) {
      setLoginData({ ...loginData, userEmailError: true });
    }
    if (!loginData.userPassword) {
      setLoginData({ ...loginData, userPasswordError: true });
    }
    if (loginData.userEmail && loginData.userPassword) {
      onSubmit({
        email: loginData.userEmail,
        password: loginData.userPassword,
      });
    }
  };

  return (
    <div className="user-page">
      <Header headerType={HeaderType.SignIn}>
        <h1
          className="page-title user-page__title"
          data-testid={'user-block__header__sign-in'}
        >
          Sign in
        </h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {messageError && (
            <div className="sign-in__message" data-testid={'errorContainer'}>
              {messageError.map((message) => (
                <p key={`key_${message}`}>{message}</p>
              ))}
            </div>
          )}
          <div className="sign-in__fields">
            <div
              className={`sign-in__field ${
                loginData.userEmailError ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                className="sign-in__input"
                placeholder="Email address"
                name="userEmail"
                id="user-email"
                data-testid={'loginElement'}
                onChange={loginChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div
              className={`sign-in__field ${
                loginData.userPasswordError ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="userPassword"
                id="user-password"
                data-testid={'passwordElement'}
                onChange={loginChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              data-testid={'buttonElement'}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
