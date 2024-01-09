import Loading from './loading.tsx';
import EmptyBlock from '../../pages/empty/emptyBlock.tsx';

function LoadingBlock(): JSX.Element {
  return (
    <EmptyBlock>
      <Loading />
    </EmptyBlock>
  );
}

export default LoadingBlock;
