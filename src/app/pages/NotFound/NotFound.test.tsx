import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { NotFound } from './NotFound';
import { fetchApi } from '../../utils/req';
import { Route, Router, useLocation } from 'wouter';

jest.mock('../../utils/req', () => ({
  fetchApi: jest.fn(),
}));

const navigateMock = jest.fn();

jest.mock('wouter', () => ({
  useLocation: jest.fn(),
  Router: ({ children }: any) => <div>{children}</div>, // mocka o Router para não quebrar
  Route: ({ component: Component }: any) => <Component />, // mocka o Route também
}));

describe('NotFound component', () => {
  const mockData = [
    { id_empresa: 1, nome_empresa: 'Empresa A' },
    { id_empresa: 2, nome_empresa: 'Empresa B' },
  ];

  beforeEach(async () => {
    (fetchApi as jest.Mock).mockResolvedValue(mockData);
    (useLocation as jest.Mock).mockReturnValue(['', navigateMock]);
    await waitFor(() => {
      render(<NotFound />);
    });
  });

  it('exibe o componente Load enquanto dados estão carregando', async () => {
    (fetchApi as jest.Mock).mockImplementation(() => new Promise(() => {}));

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('exibe os cards após o carregamento dos dados', async () => {
    await waitFor(() => {
      expect(screen.getByText('Empresa A')).toBeInTheDocument();
      expect(screen.getByText('Empresa B')).toBeInTheDocument();
    });
  });

  it('navega para o ID correto ao clicar em um card', async () => {
    const empresaACard = await screen.findByText('Empresa A');

    fireEvent.click(empresaACard);

    expect(navigateMock).toHaveBeenCalledWith('/1');
  });
});
