import Empty from '../../pages/empty/empty.tsx';
import Error404 from './error404.tsx';

function Error({ message }: { message?: string }): JSX.Element {
  return (
    <Empty>
      <Error404 message={message}/>
    </Empty>
  );
}

export default Error;
