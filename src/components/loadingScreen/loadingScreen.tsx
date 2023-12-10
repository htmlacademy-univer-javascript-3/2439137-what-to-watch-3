import Empty from '../../pages/empty/empty.tsx';
import Loading from './loading.tsx';

function LoadingScreen(): JSX.Element {
  return (
    <Empty>
      <Loading />
    </Empty>
  );
}

export default LoadingScreen;
