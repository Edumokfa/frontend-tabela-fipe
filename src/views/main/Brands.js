import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, HttpStatus, apiPost, apiPut } from '../../middlewares/communicationMiddleware';
import {
  Form,
  FormGroup,
  Col,
  Input,
  Modal,
  Card,
  CardHeader,
  Button,
  Table,
  Container,
  Row
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import Header from "components/Headers/Header.js";

const Tables = () => {
  const [brandList, setBrandList] = useState([]);
  const brandFormat = { codigo: "", nome: "", tipo: "Carro" };
  const [brandInEdit, setBrandInEdit] = useState(brandFormat);
  const [open, setOpen] = useState(false);

  const handleOpen = (brand) => {
    setOpen(true);
    setBrandInEdit(brand)
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await apiGet("/marcas");
    setBrandList(response.data);
  }

  const notify = (message) => toast(message);

  const deleteBrand = async (e, id) => {
    e.preventDefault();
    try {
      const response = await apiDelete("/marcas/" + id);
      if (response.status === HttpStatus.Ok) {
        await getBrands();
        notify("Registro Excluído com Sucesso");
      };
    } catch (error) {
      console.log(error);
    }
  }

  const saveBrand = async (e) => {
    e.preventDefault();

    if (!brandInEdit.nome.trim()) {
      notify("O nome é obrigatório");
      return;
    }

    if (!brandInEdit.tipo.trim()) {
      notify("O tipo é obrigatório");
      return;
    }

    const brandPayLoad = {
      "codigo": brandInEdit.codigo,
      "nome": brandInEdit.nome,
      "tipo": brandInEdit.tipo,
    }

    try {
      var response;
      if (brandInEdit.codigo) {
        response = await apiPut("/marcas", brandPayLoad);
      } else {
        response = await apiPost("/marcas", brandPayLoad);
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

  return (
    <>
      <Header />
      <Toaster />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Marcas</h3>

                <Button className="btn-icon btn-2" color="primary" type="button" onClick={() => handleOpen(brandFormat)}>
                  <span className="btn-inner--icon">
                    <i className="ni ni-fat-add" />
                  </span>
                  Novo
                </Button>
              </CardHeader>
              
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Tipo</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {brandList.length === 0 ? "Sem marcas exibir" : brandList.map((brand, index) => (
                    <tr key={index}>
                      <td>{brand.codigo}</td>
                      <td>{brand.nome}</td>
                      <td>{brand.tipo}</td>
                      <td className="text-right">
                        <Button className="btn-icon btn-2" color="primary" type="button" onClick={() => handleOpen(brand)}>
                          <span className="btn-inner--icon">
                            <i className="ni ni-ruler-pencil" />
                          </span>
                        </Button>

                        <Button className="btn-icon btn-2" color="warning" onClick={(e) => deleteBrand(e, brand.codigo)} type="button">
                          <span className="btn-inner--icon">
                            <i className="ni ni-archive-2" />
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
            Marcas
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
                  <Input disabled placeholder="Código" type="number" value={brandInEdit.codigo} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Nome</p>
                  <Input placeholder="Nome" type="text" defaultValue={brandInEdit.nome} onChange={(e) => brandInEdit.nome = e.target.value} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <p className="mb-0">Tipo</p>
                  <select className="form-control" defaultValue={brandInEdit.tipo} data-toggle="select" title="Tipo" data-placeholder="Selecione o tipo" onChange={(e) => brandInEdit.tipo = e.target.value} >
                    <option>Carro</option>
                    <option>Moto</option>
                    <option>Caminhão</option>
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
          <Button color="success" type="button" onClick={(e) => saveBrand(e)}>
            Salvar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Tables;
