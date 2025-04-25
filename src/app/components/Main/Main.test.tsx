import { render, screen } from '@testing-library/react';
import { Main } from './Main';

describe('Main component', () => {
  beforeEach(() => {
    render(
      <Main>
        <div>Teste</div>
      </Main>
    );
  });

  it('deve renderizar o componente Main', () => {
    const container = screen.getByTestId('container-area');
    expect(container).toBeInTheDocument();
  });

  it('deve renderizar os filhos corretamente', () => {
    const child = screen.getByText('Teste');
    expect(child).toBeInTheDocument();
  });
});
