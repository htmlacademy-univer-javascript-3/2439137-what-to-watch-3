import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { FetchUserData } from '../../types/fetchUserData.ts';
import { loginAction } from '../../store/api-actions.ts';
import * as classNames from 'classnames';
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
  }, [authorizationError.property.length]);

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
      <Header headerType={HeaderType.NoAuth} />

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {messageError && (
            <div className="sign-in__message">
              {messageError.map((message) => (
                <p key={`key_${message}`}>{message}</p>
              ))}
            </div>
          )}
          <div className="sign-in__fields">
            <div
              className={classNames(
                'sign-in__field',
                loginData.userEmailError ? 'sign-in__field--error' : '',
              )}
            >
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="userEmail"
                id="user-email"
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
              className={classNames(
                'sign-in__field',
                loginData.userPasswordError ? 'sign-in__field--error' : '',
              )}
            >
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="userPassword"
                id="user-password"
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
            <button className="sign-in__btn" type="submit">
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
