import { render, screen, fireEvent } from "@testing-library/react";
import { Menu } from "./Menu";
import { Product } from "../../types/Product.type";

const mockOnTroca = jest.fn();
const mockData: Product[] = [
    {
        id_produto: 1,
        tipo: "Lanche",
        desconto: 10,
        nome_produto: "X-Burguer",
        path: "https://example.com/x-burguer.jpg",
        valor: 20.0,
    },
    {
        id_produto: 2,
        tipo: "Bebida",
        desconto: 0,
        nome_produto: "Refrigerante",
        path: "https://example.com/refrigerante.jpg",
        valor: 5.0,
    },
];

describe("Menu component", () => {
    beforeEach(() => {
        render(<Menu data={mockData} onTroca={mockOnTroca} />);
    });

    it("deve renderizar o título do tipo de produto", () => {
        const title = screen.getByText(/Lanche:/i);
        expect(title).toBeInTheDocument();
    });

    it("deve renderizar o nome do produto", () => {
        const productName = screen.getByText(/X-Burguer/i);
        expect(productName).toBeInTheDocument();
    });

    it("deve renderizar o preço com desconto", () => {
        const price = screen.getByText(/R\$ 18.00/i);
        expect(price).toBeInTheDocument();
    });

    it("deve chamar onTroca ao clicar no carinho", () => {
        const carinho = screen.getByTestId("btn-carinho");
        fireEvent.click(carinho);
        expect(mockOnTroca).toHaveBeenCalledWith("Carinho");
    });

});