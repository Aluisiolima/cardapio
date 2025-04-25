import { render, screen } from "@testing-library/react";
import { Carinho } from "./Carinho";
import { ProductCarrinho } from "../../types/Product.type";

const mockOnTroca = jest.fn();
const mockData: ProductCarrinho[] = [
    {
        id_produto: 1,
        tipo: "Lanche",
        desconto: 10,
        nome_produto: "X-Burguer",
        path: "https://example.com/x-burguer.jpg",
        valor: 20.0,
        quantidade: 1,
    },
    {
        id_produto: 2,
        tipo: "Bebida",
        desconto: 0,
        nome_produto: "Refrigerante",
        path: "https://example.com/refrigerante.jpg",
        valor: 5.0,
        quantidade: 2,
    },
];



describe('Carinho component', () => {
    beforeEach(() => {
        render(<Carinho onTroca={mockOnTroca} />);
        
    });

    it('deve renderizar o componente Carinho', () => {
        const container = screen.getByTestId('carinho');
        expect(container).toBeInTheDocument();
    });

    it('deve renderizar o título "carinho"', () => {
        const title = screen.getByText(/carinho/i);
        expect(title).toBeInTheDocument();
    });

    it('deve renderizar o botão "entrega"', () => {
        const button = screen.getByText(/entrega/i);
        expect(button).toBeInTheDocument();
    });

    it('deve renderizar o botão "mesa"', () => {
        const button = screen.getByText(/mesa/i);
        expect(button).toBeInTheDocument();
    });

    it('O valor total deve ser exibido corretamente', () => {
        const valorTotal = screen.getByText(/valor total = R\$/i);
        expect(valorTotal).toBeInTheDocument();
        expect(valorTotal).toHaveTextContent("0.00");
    });
   
});