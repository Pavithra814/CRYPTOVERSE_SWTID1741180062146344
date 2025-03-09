import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from "chart.js";
import { getTranslation } from '../translations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  const backgroundColor = isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)';

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: getTranslation('price'),
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkTheme ? '#ffffff' : '#000000'
        }
      },
      title: {
        display: true,
        text: getTranslation('priceHistory').replace('{name}', coinName),
        color: isDarkTheme ? '#ffffff' : '#000000'
      }
    },
    scales: {
      y: {
        ticks: { color: isDarkTheme ? '#ffffff' : '#000000' },
        grid: { color: isDarkTheme ? '#333333' : '#e5e5e5' }
      },
      x: {
        ticks: { color: isDarkTheme ? '#ffffff' : '#000000' },
        grid: { color: isDarkTheme ? '#333333' : '#e5e5e5' }
      }
    }
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title" style={{ color: 'var(--text-primary)' }}>
          {getTranslation('priceHistory').replace('{name}', coinName)}
        </Title>
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '40px',
          fontSize: '16px', 
          fontWeight: 500,
          color: isDarkTheme ? '#ffffff' : '#000000',
          background: backgroundColor,
          padding: '8px 12px',
          borderRadius: '8px',
          zIndex: 1
        }}>
          {getTranslation('currentPrice').replace('{name}', coinName)}: $ {currentPrice}
        </div>
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '40px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          background: backgroundColor,
          padding: '4px 8px',
          borderRadius: '4px',
          zIndex: 1
        }}>
          {getTranslation('lastUpdated')}: {new Date().toLocaleString()}
        </div>
        <Line data={data} options={options} />
      </Row>
    </>
  );
};

export default LineChart;
