import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { AuthData } from '../../types/authData.ts';
import { loginAction } from '../../store/api-actions.ts';
import MessageError from './messageError.tsx';
import * as classNames from 'classnames';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { redirectToRoute } from '../../store/action.ts';
import { authorizationStatusSelector } from '../../store/selectors.ts';

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_REGEXP = /^[0-9A-ZА-ЯЁ]+$/i;

function SignIn(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
  }
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      loginRef.current === null ||
      loginRef.current.value === null ||
      !EMAIL_REGEXP.test(loginRef.current?.value)
    ) {
      setErrorLogin(true);
    }
    if (
      passwordRef.current === null ||
      passwordRef.current.value === null ||
      !PASSWORD_REGEXP.test(passwordRef.current?.value)
    ) {
      setErrorPassword(true);
    }
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const onChangeLogin = () => {
    if (errorLogin) {
      setErrorLogin(false);
    }
  };

  const onChangePassword = () => {
    if (errorPassword) {
      setErrorPassword(false);
    }
  };

  return (
    <div className="user-page">
      <Header headerType={HeaderType.NoAuth} />

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {(errorPassword || errorLogin) && (
            <MessageError
              errorLogin={errorLogin}
              errorPassword={errorPassword}
            />
          )}
          <div className="sign-in__fields">
            <div
              className={classNames(
                'sign-in__field',
                errorLogin ? 'sign-in__field--error' : '',
              )}
            >
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
                onChange={onChangeLogin}
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
                errorPassword ? 'sign-in__field--error' : '',
              )}
            >
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
                onChange={onChangePassword}
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
