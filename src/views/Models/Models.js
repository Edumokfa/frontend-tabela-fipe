import React, { useEffect, useState } from "react";
import { apiGet, apiPut, apiPost, apiDelete, HttpStatus } from "../../middlewares/communicationMiddleware";
import { Card, CardHeader, Table, Container, Row, CardBody, Button, Modal, Col, Form, FormGroup, Input } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import Header from "components/Headers/Header.js";

const AutoComplete = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredOptions = options
      .filter((option) =>
        (
          option.codigo +
          option.tipo.toLowerCase() +
          option.nome.toLowerCase()
        ).includes(inputValue.toLowerCase())
      )
      .slice(0, 10);

    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    setInputValue(option.nome + " | " + option.tipo);
    setFilteredOptions([]);
    onSelect(option);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        type="text"
        id="autoComplete"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digite para buscar"
        style={{
          padding: "8px",
          fontSize: "16px",
          width: "50vh",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {filteredOptions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            width: "50vh",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                zIndex: "10",
                position: "relative",
                backgroundColor: "white",
                borderBottom:
                  index < filteredOptions.length - 1
                    ? "1px solid #ccc"
                    : "none",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              {option.nome + " | " + option.tipo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Models = () => {
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [idToExpandRow, setIdToExpandRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicleInEdit, setVehicleInEdit] = useState({"Codigo": {}});
  const [open, setOpen] = useState(false);

  const notify = (message) => toast(message);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await apiGet("/marcas");
    setBrandList(response.data);
  };

  const handleSelect = async (selectedOption) => {
    const codigo = selectedOption.codigo;
    setLoading(true);
    try{
      const response = await apiGet("/marcas/" + codigo + "/modelos");
      const responseModelList = response.data.map((model) => ({
        ...model,
        iconRotation: 0,
      }));
      setModelList(responseModelList);
    } catch(exception){

    }
    setLoading(false);
  };

  const saveVehicle = async (e) => {
    e.preventDefault();

    const SiglaCombustivel = vehicleInEdit.Combustivel === "Diesel" ? "D" : "G";

    const vehiclePayLoad = {
      "Codigo": vehicleInEdit.Codigo,
      "AnoModelo": vehicleInEdit.AnoModelo,
      "CodigoFipe": vehicleInEdit.CodigoFipe,
      "Combustivel": vehicleInEdit.Combustivel,
      "CodigoMarca": vehicleInEdit.CodigoMarca,
      "Marca": vehicleInEdit.Marca,
      "MesReferencia": vehicleInEdit.MesReferencia,
      "Modelo": vehicleInEdit.Modelo,
      "SiglaCombustivel": SiglaCombustivel,
      "TipoVeiculo": "1",
      "Valor": vehicleInEdit.Valor,
    }

    try {
      var response;
      if (vehicleInEdit.Codigo) {
        response = await apiPut("/veiculos", vehiclePayLoad);
      } else {
        response = await apiPost("/veiculos", vehiclePayLoad);
      }
      if (response.status === HttpStatus.Ok) {
        await getBrands();
        handleClose();
        notify("Registro Salvo com Sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleIconClick = async (model) => {
    modelList.forEach((m) => {
      if (m.codigo !== model.codigo) {
        document.getElementById(m.codigo).style.transform = `rotate(0deg)`;
        m.iconRotation = 0;
      }
    });
    const iconRotation = model.iconRotation;
    model.iconRotation = iconRotation > 0 ? 0 : 90;
    const iconElement = document.getElementById(model.codigo);
    if (iconElement) {
      iconElement.style.transform = `rotate(${model.iconRotation}deg)`;
    }
    if (iconRotation > 0) {
      setIdToExpandRow(null);
    } else {
      setIdToExpandRow(model.codigo);
    }
  };

  const handleOpen = (vehicle) => {
    setOpen(true);
    setVehicleInEdit(vehicle.veiculo)
  };
  const handleClose = () => setOpen(false);

  const deleteVehicle = async (e, vehicle, model) => {
    e.preventDefault();
    try {
      const response = await apiDelete("/veiculos/" + vehicle.veiculo.Codigo.codigoFipe + "/" + vehicle.veiculo.Codigo.codigoAno);
      if (response.status === HttpStatus.Ok) {
        setModelList(modelList.map(modelo => {
          modelo.anos = modelo.anos.filter(ano => ano.veiculo.Codigo.codigoFipe !== vehicle.veiculo.Codigo.codigoFipe || ano.veiculo.Codigo.codigoAno !== vehicle.veiculo.Codigo.codigoAno);
          return modelo;
        }))
        notify("Registro Excluído com Sucesso");
      };
    } catch (error) {
      console.log(error);
    }
  }

  const styleRotateIcon = {
    position: "relative",
  };

  return (
    <>
      <Header />
      <Toaster />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Modelos</h3>
              </CardHeader>

              <CardBody>
                <p className="mb-0">Selecione uma marca</p>
                <AutoComplete options={brandList} onSelect={handleSelect} />
              </CardBody>

              {loading ? (
                <>
                  <img
                    src={require("../../assets/img/loading.gif")}
                    alt="GIF carregando"
                    style={{
                      width: "250px",
                      alignSelf: "center",
                    }}
                  />{" "}
                  <p
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    Buscando Informações{" "}
                  </p>{" "}
                  <br />
                </>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    {modelList.length !== 0 && (
                      <>
                        <tr>
                          <th scope="col" width="20" />
                          <th scope="col" width="50">
                            Código
                          </th>
                          <th scope="col">Descrição</th>
                        </tr>
                      </>
                    )}
                  </thead>
                  <tbody>
                    {modelList.length === 0 ? (
                      <tr key="noModels">
                        <td colSpan="3">
                          <p className="p-4"> Sem modelos para exibir </p>
                        </td>
                      </tr>
                    ) : (
                      modelList.map((model, index) => (
                        <React.Fragment key={index}>
                          <tr key={`mainRow_${index}`}>
                            <td className="text-left">
                              <div id={model.codigo} style={styleRotateIcon}>
                                <span
                                  className="btn-inner--icon"
                                  onClick={() => handleIconClick(model)}
                                >
                                  <i className="ni ni-bold-right" />
                                </span>
                              </div>
                            </td>
                            <td>{model.codigo}</td>
                            <td>{model.nome}</td>
                          </tr>
                          {idToExpandRow === model.codigo && (
                            <tr key={`expandedRow_${model.codigo}`}>
                              <td colSpan="3">
                                <Table
                                  style={{
                                    width: "100%",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <thead className="thead-light">
                                    <tr>
                                      <th scope="col">Código</th>
                                      <th scope="col">Descrição</th>
                                      <th scope="col">Modelo</th>
                                      <th scope="col">Valor</th>
                                      <th scope="col">Combustível</th>
                                      <th scope="col">Ano / Modelo</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {model.anos === 0 ? (
                                      <tr key={`noYears_${model.codigo}`}>
                                        <td colSpan="6">
                                          Sem Anos para exibir
                                        </td>
                                      </tr>
                                    ) : (
                                      model.anos.map((ano) => (
                                        <tr key={`years_${ano.codigo}`}>
                                          <td>{ano.codigo}</td>
                                          <td>{ano.nome}</td>
                                          <td>{ano.veiculo.Modelo}</td>
                                          <td>{ano.veiculo.Valor}</td>
                                          <td>{ano.veiculo.Combustivel}</td>
                                          <td>{ano.veiculo.AnoModelo}</td>
                                          <td className="text-right">
                                            <Button
                                              className="btn-icon btn-2"
                                              color="primary"
                                              type="button"
                                              onClick={() => handleOpen(ano)}
                                            >
                                              <span className="btn-inner--icon">
                                                <i className="ni ni-ruler-pencil" />
                                              </span>
                                            </Button>

                                            <Button
                                              className="btn-icon btn-2"
                                              color="warning"
                                              onClick={(e) =>
                                                deleteVehicle(e, ano, model)
                                              }
                                              type="button"
                                            >
                                              <span className="btn-inner--icon">
                                                <i className="ni ni-archive-2" />
                                              </span>
                                            </Button>
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card>
          </div>
        </Row>
      </Container>

      <Modal
        className="modal-dialog-centered"
        isOpen={open}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Veículos
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => handleClose()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <p className="mb-0">Código</p>
                  <Input disabled placeholder="Código" type="text" value={vehicleInEdit.Codigo.codigoAno} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Modelo</p>
                  <Input placeholder="Nome" type="text" defaultValue={vehicleInEdit.Modelo} onChange={(e) => vehicleInEdit.Modelo = e.target.value} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Código Fipe</p>
                  <Input placeholder="Nome" type="text" defaultValue={vehicleInEdit.CodigoFipe} onChange={(e) => vehicleInEdit.CodigoFipe = e.target.value} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Valor</p>
                  <Input placeholder="Nome" type="text" defaultValue={vehicleInEdit.Valor} onChange={(e) => vehicleInEdit.Valor = e.target.value} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Ano / Modelo</p>
                  <Input placeholder="Nome" type="number" defaultValue={vehicleInEdit.AnoModelo} onChange={(e) => vehicleInEdit.AnoModelo = e.target.value} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Combustível</p>
                  <select className="form-control" defaultValue={vehicleInEdit.Combustivel} data-toggle="select" title="Tipo" data-placeholder="Selecione o combustível" onChange={(e) => vehicleInEdit.Combustivel = e.target.value} >
                    <option>Gasolina</option>
                    <option>Diesel</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
          </Form>

        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => handleClose()}
          >
            Fechar
          </Button>
          <Button color="success" type="button" onClick={(e) => saveVehicle(e)}>
            Salvar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Models;
