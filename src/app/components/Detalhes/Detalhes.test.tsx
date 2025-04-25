// Detalhes.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Detalhes } from './Detalhes';
import { Product } from '../../types/Product.type';
import { ProductStore } from '../../utils/productStore';
import { fetchApi } from '../../utils/req';

jest.mock('../../utils/productStore', () => ({
  ProductStore: {
    addProduto: jest.fn(),
  },
}));

jest.mock('../../utils/req', () => ({
  fetchApi: jest.fn(() => Promise.resolve({} as Product)),
}));

jest.mock('../Load/Load', () => ({
  Load: () => <div data-testid="loading">Carregando...</div>,
}));

const mockProduct: Product = {
  id_produto: 1,
  nome_produto: 'Pizza',
  valor: 30.0,
  desconto: 10,
  tipo: 'Lanche',
  path: '/pizza.png',
};

const renderComponent = (onClose = jest.fn()) => {
  return render(<Detalhes id={1} onClose={onClose} />);
};

describe('Detalhes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchApi as jest.Mock).mockResolvedValue(mockProduct);
  });

  test('mostra o loading enquanto carrega os dados', async () => {
    renderComponent();

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() =>
      expect(fetchApi).toHaveBeenCalledWith(null, 'GET', '/pegarProduto/unico/1')
    );
  });

  test('renderiza detalhes do produto após o carregamento', async () => {
    renderComponent();
    const descricao = await screen.findByText(/Pizza/, { selector: '.descricao' });
    expect(descricao).toBeInTheDocument();
    expect(screen.getByText(/valor/i)).toBeInTheDocument();
    expect(screen.getByText(/add carrinho/i)).toBeInTheDocument();
  });

  test('altera a quantidade corretamente', async () => {
    renderComponent();

    await screen.findByText(/Pizza/, { selector: '.descricao' });

    const btnMais = screen.getByText('+');
    const btnMenos = screen.getByText('-');

    fireEvent.click(btnMais);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(btnMenos);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('adiciona o produto ao carrinho e chama addCarinho', async () => {
    const mockOnClose = jest.fn();
    renderComponent(mockOnClose);

    await screen.findByText(/Pizza/, { selector: '.descricao' });

    fireEvent.click(screen.getByText(/add carrinho/i));

    await waitFor(() => {
      expect(ProductStore.addProduto).toHaveBeenCalledWith(
        expect.objectContaining({
          id_produto: 1,
          quantidade: 1,
        })
      );
      expect(mockOnClose).toHaveBeenCalledWith(true);
    });
  });

  test('fecha o modal ao clicar no botão de fechar', async () => {
    const mockOnClose = jest.fn();
    renderComponent(mockOnClose);

    await screen.findByText(/Pizza/, { selector: '.descricao' });

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalledWith(true);
  });
});
