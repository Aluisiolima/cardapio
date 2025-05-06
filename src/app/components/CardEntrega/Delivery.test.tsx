import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Delivery } from './Delivery';
import { ProductStore } from '../../utils/productStore';
import { fetchApi } from '../../utils/req';
import { criarMensagem } from '../../utils/Whatsapp';
import { Empresa } from '../../types/Empresa.type';

const mockGetIds = jest.spyOn(ProductStore, 'getIds');

const mockGetProducts = jest.spyOn(ProductStore, 'getProdutos');

jest.mock('../../utils/req', () => ({
  fetchApi: jest.fn(),
}));

jest.mock('../../utils/calcFrete', () => ({
  calcFrete: jest.fn(() => Promise.resolve('10.00')),
}));

jest.mock('../../utils/Whatsapp', () => ({
  criarMensagem: jest.fn(),
}));

jest.mock('wouter', () => ({
  useParams: () => ({ id: 1 }),
}));

const mockOnTroca = jest.fn();
const empresaMock: Empresa = {
  id_empresa: 1,
  nome_empresa: 'Empresa Teste',
  email: 'empresa@teste.com',
  whatsapp: '88999999999',
  endereco: 'Rua A, 123',
  path: 'logo.jpg',
  instagram: 'instagram.com/empresa',
  facebook: 'facebook.com/empresa',
};
const mockGetProdutos = [
  {
    id_produto: 1,
    nome_produto: 'Produto Teste',
    quantidade: 2,
    valor: 50,
    path: 'imagem.jpg',
    tipo: 'imagem',
    desconto: 0,
    descricao: 'Descrição do produto',
  },
];
const idsMock = [{ id: 1, quantidade: 2, desconto_aplicado: 0 }];

describe('Delivery component', () => {
  beforeEach(() => {
    mockGetIds.mockReturnValue(idsMock);
    mockGetProducts.mockReturnValue(mockGetProdutos);
    waitFor(() => render(<Delivery data={empresaMock} onTroca={mockOnTroca} />));
  });

  it('renderiza inputs de formulário corretamente', () => {
    expect(screen.getByPlaceholderText('nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('bairro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('rua')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('numero da casa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('numero para contato')).toBeInTheDocument();
  });

  it('atualiza os valores dos inputs corretamente', () => {
    const nomeInput = screen.getByPlaceholderText('nome') as HTMLInputElement;
    fireEvent.change(nomeInput, { target: { value: 'Aluízio' } });
    expect(nomeInput.value).toBe('Aluízio');
  });

  it('exibe os produtos escolhidos', () => {
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('R$ 50')).toBeInTheDocument();
  });

  it('envia pedido corretamente se o formulário estiver preenchido', async () => {
    (fetchApi as jest.Mock).mockResolvedValue({ success: true });

    fireEvent.change(screen.getByPlaceholderText('nome'), { target: { value: 'Aluízio' } });
    fireEvent.change(screen.getByPlaceholderText('bairro'), { target: { value: 'Centro' } });
    fireEvent.change(screen.getByPlaceholderText('rua'), { target: { value: 'Rua A' } });
    fireEvent.change(screen.getByPlaceholderText('numero da casa'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('numero para contato'), {
      target: { value: '88999999999' },
    });

    const button = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnTroca).toHaveBeenCalledWith('Load');
      expect(fetchApi).toHaveBeenCalled();
      expect(criarMensagem).toHaveBeenCalled();
      expect(mockOnTroca).toHaveBeenCalledWith('Success');
    });
  });

  it('seleciona corretamente a forma de pagamento', () => {
    const pixRadio = screen.getByLabelText('Pix') as HTMLInputElement;
    const cartaoRadio = screen.getByLabelText('Cartão') as HTMLInputElement;
    const dinheiroRadio = screen.getByLabelText('Dinheiro') as HTMLInputElement;

    fireEvent.click(cartaoRadio);
    expect(cartaoRadio.checked).toBe(true);
    expect(pixRadio.checked).toBe(false);
    expect(dinheiroRadio.checked).toBe(false);
  });

  it('não envia pedido se campos obrigatórios estiverem vazios', async () => {
    const button = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchApi).not.toHaveBeenCalled();
      expect(criarMensagem).not.toHaveBeenCalled();
      expect(mockOnTroca).not.toHaveBeenCalledWith('Load');
    });
  });
});
