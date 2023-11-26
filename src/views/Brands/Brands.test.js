import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Brands from './Brands';
import Header from '../../components/Headers/Header';

// Mock the communicationMiddleware functions
jest.mock('../../middlewares/communicationMiddleware', () => ({
  apiGet: jest.fn(() => Promise.resolve({ data: [] })),
  apiDelete: jest.fn(() => Promise.resolve({ status: 200 })),
  apiPost: jest.fn(() => Promise.resolve({ status: 200 })),
  apiPut: jest.fn(() => Promise.resolve({ status: 200 })),
  HttpStatus: { Ok: 200 },
}));

describe('Brands Component', () => {
  it('renders without crashing', async () => {
    render(<Header />, <Brands />);
    // Check if the component renders without crashing
    await waitFor(() => expect(screen.getByText('Marcas')).toBeInTheDocument());
  });

  // Add more test cases for other functionalities as needed
});
