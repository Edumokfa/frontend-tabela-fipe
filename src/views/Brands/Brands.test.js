import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Brands from './Brands';
import Header from '../../components/Headers/Header';

import communicationMiddleware from '../../middlewares/communicationMiddleware';
import { act } from 'react-dom/test-utils';

jest.mock('../../middlewares/communicationMiddleware', () => {
  const mockApiGet = jest.fn();

  mockApiGet.mockImplementation(async (url) => {
    switch (url) {
      case '/marcas':
        return { data: [{"codigo": 2, "nome": "Agrario", "tipo": "Carro"}] }; 
      default:
        return { data: [] };
    }
  });

  return { apiGet: mockApiGet };
});

describe('Brands Component', () => {
  it('renders without crashing', async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Brands />);
    
    expect(screen.getByText('Marcas', { selector: 'h3' })).toBeInTheDocument();
  });

  it('show data', async () => {
    act(() => {
      render(<Brands />);
    });
    
    expect(screen.getByText('Acura')).toBeInTheDocument();
  });
});
