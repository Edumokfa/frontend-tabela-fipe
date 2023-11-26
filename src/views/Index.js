import { useState, useEffect } from "react";
import { apiGet } from "../middlewares/communicationMiddleware";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [xAxisOption, setXAxisOption] = useState("");
  const [yAxisOption, setYAxisOption] = useState("");

  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    try {
      const response = await apiGet("/veiculos/grafico");
      setXAxisOption(response.data.map(item => item.marca));
      setYAxisOption(response.data.map(item => item.quantidadeModelos));
    } catch (error) {
      console.log(error);
    }
  }

  let chartExample1 = {
    data1: (canvas) => {
      return {
        labels: xAxisOption,
        datasets: [
          {
            data: yAxisOption,
          },
        ],
      };
    },
  };

  const [chartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>

      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Top 10 Marcas com mais Modelos</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
