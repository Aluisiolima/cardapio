import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';
import { Product } from '../../types/Product.type';

const mockOnTroca = jest.fn();
const mockData: Product[] = [
  {
    id_produto: 1,
    tipo: 'Lanche',
    desconto: 10,
    nome_produto: 'X-Burguer',
    path: 'https://example.com/x-burguer.jpg',
    valor: 20.0,
    descricao: 'Delicioso X-Burguer com queijo e bacon',
  },
  {
    id_produto: 2,
    tipo: 'Bebida',
    desconto: 0,
    nome_produto: 'Refrigerante',
    path: 'https://example.com/refrigerante.jpg',
    valor: 5.0,
    descricao: 'Refrigerante gelado de 2L',
  },
];

describe('Menu component', () => {
  beforeEach(() => {
    render(<Menu data={mockData} onTroca={mockOnTroca} />);
  });

  it('deve renderizar os títulos dos tipos de produto', () => {
    const title = screen.getByText(/Lanche:/i);
    expect(title).toBeInTheDocument();
    const title2 = screen.getByText(/Bebida:/i);
    expect(title2).toBeInTheDocument();
  });

  it('deve renderizar os nomes dos produtos', () => {
    const productName = screen.getByText(/X-Burguer/i);
    expect(productName).toBeInTheDocument();
    const productName2 = screen.getByText(/Refrigerante/i);
    expect(productName2).toBeInTheDocument();
  });

  it('deve renderizar o preço com desconto', () => {
    const price = screen.getByText(/R\$ 18.00/i);
    expect(price).toBeInTheDocument();
  });

  it('deve chamar onTroca ao clicar no carinho', () => {
    const carinho = screen.getByTestId('btn-carinho');
    fireEvent.click(carinho);
    expect(mockOnTroca).toHaveBeenCalledWith('Carinho');
    expect(mockOnTroca).toHaveBeenCalledTimes(1);
  });
});
