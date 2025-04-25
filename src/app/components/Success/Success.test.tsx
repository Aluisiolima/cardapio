import { render, screen } from '@testing-library/react';
import { Success } from './Success';

describe('Success component', () => {
  beforeEach(() => {
    render(<Success />);
  });

  it('deve renderizar o ícone de sucesso', () => {
    const { container } = render(<Success />);
    const icon = container.querySelector('.bi-check2-circle');
    expect(icon).toBeInTheDocument();
  });

  it('deve renderizar a mensagem de sucesso', () => {
    const message = screen.getByText(/aguarde mais um pouquinho/i);
    expect(message).toBeInTheDocument();
  });
});
