import { render, screen } from '@testing-library/react';
import Loading from './loading.tsx';

describe('Component: loading', () => {
  it('should render correct', () => {
    const loadingContainerTestId = 'loader_container';

    render(<Loading />);
    const mistakesContainer = screen.getByTestId(loadingContainerTestId);

    expect(mistakesContainer).toBeInTheDocument();
  });
});
