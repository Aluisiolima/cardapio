import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const mockDataFooter = {
    instagram: 'instagram',
    facebook: 'facebook',
    whatsapp: 'whatsapp',
    endereco: 'Rua dos bobos, 0',
    email : 'email',
}

describe('Footer component', () => {
    beforeEach(() => {
        render(<Footer data={mockDataFooter}/>);
    });

    it('deve renderizar o componente Footer', () => {
        const container = screen.getByTestId('footer');
        expect(container).toBeInTheDocument();
    });

    it('deve renderizar o texto "Desenvolvido por"', () => {
        const text = screen.getByText(/desenvolvido por/i);
        expect(text).toBeInTheDocument();
    });

    it('deve renderizar o ícone do Whatsapp', () => {
        const icon = screen.getByTestId('whatsapp');
        expect(icon).toBeInTheDocument();
    });

    it('deve renderizar o Endereço', () => {
        const icon = screen.getByTestId('maps');
        expect(icon).toBeInTheDocument();
    });
});