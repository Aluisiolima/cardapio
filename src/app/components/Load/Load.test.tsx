import { render, screen } from "@testing-library/react";
import { Load } from "./Load";

describe('Load component', () => {
    beforeEach(() => {
        render(<Load />);
    });

    it('deve renderizar o ícone de carregamento', () => {
        const { container } = render(<Load />);
        const icon = container.querySelector(".load");
        expect(icon).toBeInTheDocument();
    });

    it('deve renderizar a mensagem de carregamento', () => {
        const message = screen.getByText(/carregando.../i);
        expect(message).toBeInTheDocument();
    });
}
);