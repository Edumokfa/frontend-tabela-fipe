import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Brands from './Brands';
import communicationMiddleware from '../../middlewares/communicationMiddleware';

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

    // Set up the apiGet mock to resolve with the mock data
    communicationMiddleware.apiGet.mockResolvedValue({ data: mockData });

    // Render the component
    render(<Brands />);

    // Wait for the component to update
    await waitFor(() => {
      // Check if the brand list is rendered correctly
      expect(screen.getByText('Agrario')).toBeInTheDocument();
      expect(screen.getByText('Acura')).toBeInTheDocument();
    });

    // Verify that apiGet was called with the correct endpoint
    expect(communicationMiddleware.apiGet).toHaveBeenCalledWith('/marcas');
  });

  it('handles an empty brandList', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Brands />);

    await waitFor(() => {
      // Check if the "Sem marcas exibir" message is rendered
      expect(screen.getByText('Sem marcas exibir')).toBeInTheDocument();
    });
  });
});
