import Main, { MainPros } from '../../pages/main/main.tsx';

function App(pros: MainPros): JSX.Element {
  return <Main {...pros} />;
}

export default App;
