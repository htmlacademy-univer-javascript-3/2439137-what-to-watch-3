interface MessageErrorProps {
  errorLogin: boolean;
  errorPassword: boolean;
}

function MessageError({
  errorLogin,
  errorPassword,
}: MessageErrorProps): JSX.Element {
  const message = () => {
    switch (true) {
      case errorLogin && errorPassword:
        return `We can’t recognize this email
              and password combination. Please try again.`;
      case errorPassword:
        return 'Please enter a valid email address';
      case errorLogin:
        return 'Please enter a valid email address';
    }
  };
  return (
    <div className="sign-in__message">
      <p>{message()}</p>
    </div>
  );
}

export default MessageError;
