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
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import Graph from "../graph";

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
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
  const timeLabels = [];

  while (oneHourAgo < now) {
    timeLabels.push(
      oneHourAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    oneHourAgo.setTime(oneHourAgo.getTime() + 5 * 60 * 1000); // Add 5 minutes
  }

  const options = {
    scales: {
      x: {
        type: "category", // Define the x-axis as categorical
        title: {
          display: true,
          text: "Timestamp",
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Usage %",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 5, // Customize tick intervals
        },
      },
    },
  };
  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "Data Set 1",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const tableData = [
    { id: 1, column1: "Row 1, Col 1", column2: "Row 1, Col 2" },
    { id: 2, column1: "Row 2, Col 1", column2: "Row 2, Col 2" },
  ];

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
              <ProgressBar now={75} label="75%" />
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
                    <Graph data={data} options={options}></Graph>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border rounded shadow">
                  <Card.Body>
                    <Card.Title>Bar Chart</Card.Title>
                    <p>This is some text content.</p>
                  </Card.Body>
                </Card>
                <Card className="border rounded shadow">
                  <Card.Body>
                    <Card.Title>Bar Chart</Card.Title>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Column 1</th>
                          <th>Column 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row) => (
                          <tr key={row.id}>
                            <td>{row.column1}</td>
                            <td>{row.column2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
