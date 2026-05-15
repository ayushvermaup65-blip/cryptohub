import React from "react";

import millify from "millify";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { Col, Row, Typography } from "antd";

const { Title } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler,
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  if (!coinHistory?.prices) {
    return <h2>Loading Chart...</h2>;
  }

  coinHistory.prices
    ?.filter((_, index) => index % 5 === 0)
    ?.forEach((item) => {
      coinPrice.push(item[1]);

      coinTimestamp.push(
        new Date(item[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
    });

  const data = {
    labels: coinTimestamp,

    datasets: [
      {
        label: "Price In USD",

        data: coinPrice,

        fill: true,

        tension: 0.4,

        borderWidth: 2,

        backgroundColor: "rgba(0, 113, 189, 0.2)",

        borderColor: "#0071bd",

        pointRadius: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: true,
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },

      y: {
        beginAtZero: false,

        ticks: {
          callback: (value) => `$${millify(value)}`,
        },
      },
    },
  };
  console.log(coinHistory);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>

        <Col className="price-container">
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>


      <div
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
