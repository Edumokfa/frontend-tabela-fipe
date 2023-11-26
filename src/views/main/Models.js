import React, { useEffect, useState } from 'react';
import { apiGet } from '../../middlewares/communicationMiddleware';
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody
} from "reactstrap";
import { Toaster } from 'react-hot-toast';
import Header from "components/Headers/Header.js";

const AutoComplete = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredOptions = options.filter(option =>
      (option.codigo + option.tipo.toLowerCase() + option.nome.toLowerCase()).includes(inputValue.toLowerCase())
    ).slice(0, 10);

    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    setInputValue(option.nome + " | " + option.tipo);
    setFilteredOptions([]);
    onSelect(option);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digite para buscar"
        style={{
          padding: '8px',
          fontSize: '16px',
          width: '50vh',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      {filteredOptions.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '50vh',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                "z-index": "10",
                position: 'relative',
                "background-color": "white",
                borderBottom: index < filteredOptions.length - 1 ? '1px solid #ccc' : 'none',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
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

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await apiGet("/marcas");
    setBrandList(response.data);
  };

  const handleSelect = async (selectedOption) => {
    const codigo = selectedOption.codigo;
    const response = await apiGet("/marcas/" + codigo + "/modelos");
    const responseModelList = response.data.map(model => ({ ...model, iconRotation: 0 }));
    setModelList(responseModelList);
  };

  const handleIconClick = async (model) => {
    modelList.forEach(m => {
      if ( m.codigo !== model.codigo ) {
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
  }

  const styleRotateIcon = {
    "position": "relative"
  }

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

              <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  {modelList.length !== 0 &&
                    <>
                      <tr>
                        <th scope="col" width="20" />
                        <th scope="col" width="50">Código</th>
                        <th scope="col">Descrição</th>
                      </tr>
                    </>
                  }
                  </thead>
                  <tbody>
                    {modelList.length === 0 ? "Sem modelos para exibir" : modelList.map((model, index) => (
                      <>
                        <tr key={index}>
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
                        {idToExpandRow === model.codigo &&
                          <tr key={index * -1}>
                            <td colSpan="3">
                            <Table style={{"width": "100%", "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">Código</th>
                                  <th scope="col">Descrição</th>
                                  <th scope="col">Modelo</th>
                                  <th scope="col">Valor</th>
                                  <th scope="col">Combustível</th>
                                  <th scope="col">Ano / Modelo</th>
                                </tr>
                              </thead>
                              <tbody>
                                {model.anos === 0 ? "Sem Anos para exibir" : model.anos.map((ano, index) => (
                                  <tr key={index}>
                                    <td>{ano.codigo}</td>
                                    <td>{ano.nome}</td>
                                    <td>{ano.veiculo.Modelo}</td>
                                    <td>{ano.veiculo.Valor}</td>
                                    <td>{ano.veiculo.Combustivel}</td>
                                    <td>{ano.veiculo.AnoModelo}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            </td>
                          </tr>
                        }
                      </>
                    ))}
                  </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Models;
