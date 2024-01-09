import Logo from '../logo/logo.tsx';
import { ReactNode, useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';
import { getClassHeader } from './utils.tsx';
import { getContentHeader } from './utils.tsx';

export const HeaderType = {
  Empty: 'empty',
  MyList: 'myList',
  SignIn: 'signIn',
  AddReview: 'addReview',
  Main: 'main',
};

interface propTypes {
  children?: ReactNode;
  headerType?: string;
}

export const Header = ({
  children,
  headerType = HeaderType.Main,
}: propTypes) => {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const contentHeader = useMemo(
    () => getContentHeader(headerType, authorizationStatus),
    [headerType, authorizationStatus],
  );
  const classHeader = useMemo(
    () => getClassHeader(headerType, authorizationStatus),
    [headerType, authorizationStatus],
  );
  return (
    <>
      {(headerType === HeaderType.Main ||
        headerType === HeaderType.AddReview) && (
        <h1 className="visually-hidden">WTW</h1>
      )}
      <header className={`page-header ${classHeader}`} data-testid={'header'}>
        <Logo isLight={false} />
        {children}
        {contentHeader}
      </header>
    </>
  );
};
