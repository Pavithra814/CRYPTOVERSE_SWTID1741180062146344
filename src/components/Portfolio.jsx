import React from 'react';
import { Typography } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import PortfolioTracker from './PortfolioTracker';
import { getTranslation } from '../translations';

const { Title } = Typography;

const Portfolio = () => {
  const { data, error, isLoading } = useGetCryptosQuery(100);

  if (isLoading) return <div style={{ color: 'var(--text-primary)' }}>{getTranslation('loading')}</div>;
  if (error) return <div style={{ color: 'var(--text-primary)' }}>{getTranslation('errorLoading')}</div>;

  return (
    <div className="portfolio-page">
      <Title level={1} className="heading" style={{ color: 'var(--text-primary)' }}>
        {getTranslation('portfolioTitle')}
      </Title>
      <PortfolioTracker cryptoData={data?.coins} />
    </div>
  );
};

export default Portfolio; 