import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Models from './Models';
import communicationMiddleware from '../../middlewares/communicationMiddleware';

jest.mock('../../components/Headers/Header.js', () => () => null);

jest.mock('../../middlewares/communicationMiddleware', () => ({
  apiGet: jest.fn(),
  apiDelete: jest.fn(),
  apiPost: jest.fn(),
  apiPut: jest.fn(),
  HttpStatus: { Ok: 200 },
}));

describe('Brand auto complete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Models />);

    expect(screen.getByText('Modelos', { selector: 'h3' })).toBeInTheDocument();
  });

  it('fetches and displays brandList', async () => {
    const mockData = [
      { "codigo": 2, "nome": "Agrario", "tipo": "Carro" },
      { "codigo": 3, "nome": "Acura", "tipo": "Carro" }
    ];

    communicationMiddleware.apiGet.mockResolvedValue({ data: mockData });
    
    render(<Models />);
  
    const input = screen.getByPlaceholderText('Digite para buscar');
    fireEvent.change(input, { target: { value: 'A' } });

    expect(communicationMiddleware.apiGet).toHaveBeenCalledWith('/marcas');
  });

  it('handles an empty brandList', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Models />);

    await waitFor(() => {
      expect(screen.getByText('Sem modelos para exibir')).toBeInTheDocument();
    });
  });
});
