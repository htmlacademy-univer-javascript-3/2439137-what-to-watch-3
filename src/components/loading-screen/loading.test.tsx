import { render, screen } from '@testing-library/react';
import { Loading } from './loading.tsx';

describe('Component: loading', () => {
  it('should render correct', () => {
    const loadingContainerTestId = 'loader_container';

    render(<Loading />);
    const loadingContainer = screen.getByTestId(loadingContainerTestId);

    expect(loadingContainer).toBeInTheDocument();
  });
});
