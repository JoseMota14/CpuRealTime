import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import useCpu from "../../hooks/useCpu";
import { options } from "../../utils/graphConst";
import Graph from "../graph";
import Table from "../table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Monitor() {
  const { percentages, cpu } = useCpu();

  const getValues = () => {
    const values: Number[] = percentages.map((el) => {
      return el.Percentage;
    });
    return values;
  };

  const times = useMemo(() => {
    const timeLabels: any[] = [];
    // Calculate and return the times when percentages change
    const calculateTimes = () => {
      if (timeLabels.length === 0 && percentages.length > 0) {
        const times2: any[] = percentages.map((el) => {
          const dateValue = new Date(
            new Date().setHours(el.Time.Hour, el.Time.Minute)
          );
          const v = dateValue.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return v;
        });
        return times2;
      }
      return [];
    };

    return calculateTimes(); // Calculate times when percentages change
    // eslint-disable-next-line
  }, [percentages]); // Re-calculate when percentages change

  const cpuValue = useMemo(() => {
    const obtainValue = () => {
      if (percentages.length > 0) {
        return percentages[percentages.length - 1].Percentage;
      }
    };
    return obtainValue();
  }, [percentages]);

  const dataBar = useMemo(() => {
    const values = getValues();

    return {
      labels: times,
      datasets: [
        {
          label: "Data Set 1",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
          borderColor: "rgba(75, 192, 192, 1)", // Border color
          borderWidth: 1,
        },
      ],
    };
    // eslint-disable-next-line
  }, [percentages]);

  const row: string[][] = [["Cores", cpu?.CoreCount?.toString()]];

  return (
    <Container fluid style={{ padding: "1%" }}>
      <Row>
        <Col>
          <Card className="border rounded shadow p-1">
            <Card.Title>Task manager</Card.Title>
            <Card.Text>
              Recreating a windows task manager with real time data
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingTop: "1%" }}>
        <Col sm={12} md={6} lg={3}>
          <Card
            style={{ cursor: "pointer" }}
            className="border rounded shadow "
          >
            <Card.Body>
              <Card.Title>Processor</Card.Title>
              <ProgressBar now={cpuValue} label={`${cpuValue}%`} />
            </Card.Body>
          </Card>
          <Card className="border rounded shadow mt-1">
            <Card.Body>
              <Card.Title>Memory</Card.Title>
              <Card.Text style={{ color: "grey" }}>*Mock data</Card.Text>
              <ProgressBar now={50} label="50%" />
            </Card.Body>
          </Card>
          <Card className="border rounded shadow mt-1">
            <Card.Body>
              <Card.Title>Disk</Card.Title>
              <Card.Text style={{ color: "grey" }}>*Mock data</Card.Text>
              <ProgressBar now={30} label="30%" />
            </Card.Body>
          </Card>
          <Card className="border rounded shadow mt-1">
            <Card.Body>
              <Card.Title>Network</Card.Title>
              <Card.Text style={{ color: "grey" }}>*Mock data</Card.Text>
              <ProgressBar now={60} label="60%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card className="border rounded shadow p-1">
            <h5 style={{ marginLeft: "2%", paddingTop: "1%" }}>Cpu</h5>
            <Row>
              <Col md={6}>
                <Card className="border rounded shadow">
                  <Card.Body>
                    <Card.Title>Bar Chart</Card.Title>
                    <Graph data={dataBar} options={options}></Graph>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border rounded shadow">
                  <Card.Body>
                    <Card.Title>Cpu details</Card.Title>
                    <Table column={["Detail", "Value"]} row={row}></Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
