import { Loading } from './loading.tsx';
import { Empty } from '../../pages/empty/empty-block.tsx';

export function LoadingBlock(): JSX.Element {
  return (
    <Empty>
      <Loading />
    </Empty>
  );
}
