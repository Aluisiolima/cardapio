import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Detalhes } from './Detalhes';
import { ProductStore } from '../../utils/productStore';
import { fetchApi } from '../../utils/req';
import { Product } from '../../types/Product.type';

jest.spyOn(ProductStore, 'addProduto').mockImplementation(() => {
  return Promise.resolve();
});

const mockProduct: Product = {
  id_produto: 1,
  nome_produto: 'Pizza',
  valor: 30.0,
  desconto: 10,
  tipo: 'Lanche',
  path: '/pizza.png',
  descricao: 'Deliciosa pizza de queijo',
};

jest.mock('../../utils/req', () => ({
  fetchApi: jest.fn(),
}));

jest.mock('../Load/Load', () => ({
  Load: () => <div data-testid="loading">Carregando...</div>,
}));

const onClose = jest.fn();

describe('Detalhes Component', () => {
  beforeEach(() => {
    (fetchApi as jest.Mock).mockResolvedValue(mockProduct);
    waitFor(() => {
      render(<Detalhes id={1} onClose={onClose} />);
    });
  });

  it('mostra o loading enquanto carrega os dados', async () => {
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(fetchApi).toHaveBeenCalledWith(null, 'GET', '/produto/1'));
  });

  it('renderiza detalhes do produto após o carregamento', async () => {
    const descricao = await screen.findByText(/Deliciosa pizza de queijo/, {
      selector: '.descricao',
    });
    expect(descricao).toBeInTheDocument();
    expect(screen.getByText(/valor/i)).toBeInTheDocument();
    expect(screen.getByText(/adicionar ao carrinho/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Lanche/i)).toBeInTheDocument();
  });

  it('altera a quantidade corretamente', async () => {
    waitFor(async () => {
      await screen.findByText(/Pizza/, { selector: '.descricao' });
      const btnMais = screen.getByText('+');
      const btnMenos = screen.getByText('-');

      fireEvent.click(btnMais);
      expect(screen.getByText('2')).toBeInTheDocument();

      fireEvent.click(btnMenos);
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('adiciona o produto ao carrinho e chama addCarinho', async () => {
    await screen.findByText(/Deliciosa pizza de queijo/, { selector: '.descricao' });

    fireEvent.click(screen.getByText(/adicionar ao carrinho/i));

    await waitFor(() => {
      expect(ProductStore.addProduto).toHaveBeenCalledWith(
        expect.objectContaining({
          id_produto: 1,
          quantidade: 1,
        })
      );
      expect(onClose).toHaveBeenCalledWith(true);
    });
  });

  it('fecha o modal ao clicar no botão de fechar', async () => {
    await screen.findByText(/Deliciosa pizza de queijo/, { selector: '.descricao' });

    fireEvent.click(screen.getByTestId('close-button'));
    expect(onClose).toHaveBeenCalledWith(true);
  });
});
