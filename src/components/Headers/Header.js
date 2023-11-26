import { useState, useEffect } from "react";
import { apiGet } from '../../middlewares/communicationMiddleware';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { formatDateTimeYYYYMMDDHHMMSS } from "../../utils/dateUtil"

const Header = () => {
  const [numberOfBrands, setNumberOfBrands] = useState("");
  const [numberOfModels, setNumberOfModels] = useState("");
  const [numberOfVehicles, setNumberOfVehicles] = useState("");
  const [lastIterationLogBrand, setLastIterationLogBrand] = useState("");
  const [lastIterationLogModel, setLastIterationLogModel] = useState("");

  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    try {
      let response = await apiGet("/marcas/quantidade");
      setNumberOfBrands(response.data);

      response = await apiGet("/marcas/modelos/quantidade");
      setNumberOfModels(response.data);

      response = await apiGet("/veiculos/quantidade");
      setNumberOfVehicles(response.data);

      response = await apiGet("/logs/B");
      setLastIterationLogBrand(response.data);

      response = await apiGet("/logs/M");
      setLastIterationLogModel(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="header bg-gradient-success pb-8 pt-5">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Marcas
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberOfBrands}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-blue text-white rounded-circle shadow fa-flip">
                          <i className="fas fa-tag fa-flip" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-clock text-blue" />
                      </span>
                      <span className="text-nowrap">Atualizado em {formatDateTimeYYYYMMDDHHMMSS(lastIterationLogBrand.data)}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Modelos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberOfModels}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow fa-flip">
                          <i className="ni ni ni-ambulance fa-flip" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-clock text-green" />
                      </span>
                      <span className="text-nowrap">Atualizado em {formatDateTimeYYYYMMDDHHMMSS(lastIterationLogModel.data)}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Veículos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {numberOfVehicles}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow fa-flip">
                          <i className="fas fa-car fa-flip" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-clock text-green" />
                      </span>
                      <span className="text-nowrap">Atualizado em {formatDateTimeYYYYMMDDHHMMSS(lastIterationLogModel.data)}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
