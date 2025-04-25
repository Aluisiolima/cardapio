import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from './Nav';

const mockOnTroca = jest.fn();

const mockData = {
  path: 'https://example.com/logo.png',
  nome_empresa: 'Minha Empresa',
  whatsapp: '123456789',
  instagram: 'empresa_insta',
  facebook: null,
};

describe('Nav component', () => {
  beforeEach(() => {
    render(<Nav data={mockData} onTroca={mockOnTroca} />);
  });

  it('deve renderizar o nome da empresa', () => {
    expect(screen.getByText('Minha Empresa')).toBeInTheDocument();
  });

  it('deve chamar onTroca ao clicar em "cardapio"', () => {
    const cardapio = screen.getByText('cardapio');
    fireEvent.click(cardapio);
    expect(mockOnTroca).toHaveBeenCalledWith('Cardapio');
  });

  it('deve renderizar link do whatsapp', () => {
    const whatsappLink = screen.getByTestId('link-whatsapp');
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/123456789');
  });

  it('não deve renderizar facebook se for null', () => {
    expect(screen.queryByRole('link', { name: /facebook/i })).not.toBeInTheDocument();
  });

  it('deve ter a imagem com src correta', () => {
    const img = screen.getByAltText('logo') as HTMLImageElement;
    expect(img.src).toBe(mockData.path);
  });
});
