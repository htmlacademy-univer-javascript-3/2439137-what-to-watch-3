import Empty from '../../pages/empty/empty.tsx';
import Error404 from './error404.tsx';

function Error(): JSX.Element {
  return (
    <Empty>
      <Error404 />
    </Empty>
  );
}

export default Error;
