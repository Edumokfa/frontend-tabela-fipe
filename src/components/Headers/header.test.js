import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import communicationMiddleware from "../../middlewares/communicationMiddleware";

jest.mock("../../utils/dateUtil.js");

jest.mock("../../middlewares/communicationMiddleware", () => ({
  apiGet: jest.fn(),
  apiDelete: jest.fn(),
  apiPost: jest.fn(),
  apiPut: jest.fn(),
  HttpStatus: { Ok: 200 },
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: [] });

    render(<Header />);

    expect(screen.getByText("Marcas")).toBeInTheDocument();
    expect(screen.getByText("Modelos")).toBeInTheDocument();
    expect(screen.getByText("Veículos")).toBeInTheDocument();
  });

  it("test with response from api", async () => {
    await communicationMiddleware.apiGet.mockResolvedValue({ data: 200 });

    render(<Header />);

    await waitFor(() => {
      const elementos200 = screen.getAllByText("200");
      expect(elementos200).toHaveLength(3);
    });
  });
  const data = { codigo: 198, data: '2023-11-26T17:49:29.853+00:00', tipo: 'B'};
  test('Teste com resposta da API', async () => {
  communicationMiddleware.apiGet.mockResolvedValue({ data });

  // Renderizar o componente
  render(<Header />);
  
  await waitFor(() => {
    const elementoAtualizado = screen.getAllByText("Atualizado em");
    expect(elementoAtualizado).toHaveLength(3);
  });
});
});
