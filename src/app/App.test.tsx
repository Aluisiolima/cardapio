import { render, screen, waitFor } from '@testing-library/react';
import { Route, Router } from 'wouter';
import { Cardapio } from './pages/Cardapio/Cardapio';
import { NotFound } from './pages/NotFound/NotFound';
import { fetchApi } from './utils/req';

const renderComRota = (rota: string) => {
  window.history.pushState({}, 'Test page', rota);
  return render(
    <Router>
      <Route path="/" component={NotFound} />
      <Route path="/:id" component={Cardapio} />
      <Route>404 - Página não encontrada</Route>
    </Router>
  );
};

jest.mock('./utils/req');

const mockFetchApi = fetchApi as jest.Mock;

beforeEach(() => {
  mockFetchApi.mockClear();
});

test('renderiza NotFound na rota /', () => {
  renderComRota('/');
  expect(screen.getByText(/NotFound/i)).toBeInTheDocument();
});

test('renderiza Cardapio na rota /:id', async () => {
  mockFetchApi
    .mockResolvedValueOnce({}) // empresa
    .mockResolvedValueOnce([]); // produtos

  renderComRota('/1');

  await waitFor(() => {
    expect(mockFetchApi).toHaveBeenCalledTimes(2);
  });
});

test('renderiza fallback 404 se rota não existe', () => {
  renderComRota('/nao-existe/nada');
  expect(screen.getByText(/404 - Página não encontrada/i)).toBeInTheDocument();
});
