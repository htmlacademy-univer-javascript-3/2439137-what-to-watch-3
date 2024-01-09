import { Empty } from '../../pages/empty/empty.tsx';
import { Loading } from './loading.tsx';

export function LoadingScreen(): JSX.Element {
  return (
    <Empty>
      <Loading />
    </Empty>
  );
}
