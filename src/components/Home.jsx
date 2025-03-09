import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";
import { getTranslation } from '../translations';

const { Title } = Typography;

const Home = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  const language = localStorage.getItem('preferredLanguage') || 'en';
  const globalStats = data?.stats;
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (isFetching) return <Loader />;

  if (error) {
    return (
      <Title level={3} style={{ color: "var(--text-primary)" }}>
        {language === 'ta' ? 'தரவு ஏற்றுவதில் பிழை. மீண்டும் முயற்சிக்கவும்.' : 'Error loading data. Please try again later.'}
      </Title>
    );
  }

  if (!globalStats) {
    return (
      <Title level={3} style={{ color: "var(--text-primary)" }}>
        {language === 'ta' ? 'புள்ளிவிவரங்கள் எதுவும் இல்லை' : 'No statistics available'}
      </Title>
    );
  }

  return (
    <>
      <Card 
        style={{ 
          marginBottom: '24px',
          background: 'var(--bgSecondary)',
          border: '1px solid var(--border)'
        }}
      >
        <Title level={3} style={{ color: 'var(--text-primary)', margin: 0 }}>
          {getTranslation('welcome')}, {currentUser.name}!
        </Title>
      </Card>

      <Title level={2} className="heading" style={{ color: "var(--text-primary)" }}>
        {getTranslation('globalCryptoStats')}
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic 
              title={<span style={{ color: "var(--text-secondary)" }}>{getTranslation('totalCryptocurrencies')}</span>}
              value={globalStats.total} 
              valueStyle={{ color: "var(--text-primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic 
              title={<span style={{ color: "var(--text-secondary)" }}>{getTranslation('totalExchanges')}</span>}
              value={millify(globalStats.totalExchanges)} 
              valueStyle={{ color: "var(--text-primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic 
              title={<span style={{ color: "var(--text-secondary)" }}>{getTranslation('totalMarketCap')}</span>}
              value={millify(globalStats.totalMarketCap)} 
              prefix="$"
              valueStyle={{ color: "var(--text-primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic 
              title={<span style={{ color: "var(--text-secondary)" }}>{getTranslation('total24hVolume')}</span>}
              value={millify(globalStats.total24hVolume)}
              prefix="$" 
              valueStyle={{ color: "var(--text-primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic 
              title={<span style={{ color: "var(--text-secondary)" }}>{getTranslation('totalMarkets')}</span>}
              value={millify(globalStats.totalMarkets)} 
              valueStyle={{ color: "var(--text-primary)" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title" style={{ color: "var(--text-primary)" }}>
          {getTranslation('top10Heading')}
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies" style={{ color: "var(--primary)" }}>
            {getTranslation('showMore')}
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
