import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Brands from './Brands';
import communicationMiddleware from '../../middlewares/communicationMiddleware';

jest.mock('../../components/Headers/Header.js', () => () => null);

jest.mock('../../middlewares/communicationMiddleware', () => ({
  apiGet: jest.fn(),
  apiDelete: jest.fn(),
  apiPost: jest.fn(),
  apiPut: jest.fn(),
  HttpStatus: { Ok: 200 },
}));

describe('Brands Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Brands />);

    expect(screen.getByText('Marcas', { selector: 'h3' })).toBeInTheDocument();
  });

  it('fetches and displays brandList', async () => {
    const mockData = [
      { "codigo": 2, "nome": "Agrario", "tipo": "Carro" },
      { "codigo": 3, "nome": "Acura", "tipo": "Carro" }
    ];

    communicationMiddleware.apiGet.mockResolvedValue({ data: mockData });

    render(<Brands />);

    await waitFor(() => {
      expect(screen.getByText('Agrario')).toBeInTheDocument();
      expect(screen.getByText('Acura')).toBeInTheDocument();
    });

    expect(communicationMiddleware.apiGet).toHaveBeenCalledWith('/marcas');
  });

  it('handles an empty brandList', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Brands />);

    await waitFor(() => {
      expect(screen.getByText('Sem marcas exibir')).toBeInTheDocument();
    });
  });
});
