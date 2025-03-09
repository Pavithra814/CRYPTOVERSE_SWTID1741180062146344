import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Card } from 'antd';
import { 
  MoneyCollectOutlined, 
  DollarCircleOutlined, 
  FundOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined, 
  TrophyOutlined, 
  CheckOutlined, 
  NumberOutlined, 
  ThunderboltOutlined 
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';
import { getTranslation } from '../translations';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const [translatedDescription, setTranslatedDescription] = useState('');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.coin;
  const language = localStorage.getItem('preferredLanguage') || 'en';

  useEffect(() => {
    const translateDescription = async () => {
      if (cryptoDetails?.description && language === 'ta') {
        try {
          // Using Google Translate API (you'll need to set up an API key)
          const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                q: cryptoDetails.description,
                source: 'en',
                target: 'ta',
                format: 'html'
              })
            }
          );
          const data = await response.json();
          if (data.data?.translations?.[0]?.translatedText) {
            setTranslatedDescription(data.data.translations[0].translatedText);
          }
        } catch (error) {
          console.error('Translation error:', error);
          setTranslatedDescription(cryptoDetails.description);
        }
      } else {
        setTranslatedDescription(cryptoDetails?.description || '');
      }
    };

    translateDescription();
  }, [cryptoDetails?.description, language]);

  if (isFetching) return <Loader />;
  if (!cryptoDetails) return getTranslation('noCryptos');

  const stats = [
    { 
      title: getTranslation('priceToUSD'), 
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, 
      icon: <DollarCircleOutlined /> 
    },
    { 
      title: getTranslation('rank'), 
      value: cryptoDetails?.rank, 
      icon: <NumberOutlined /> 
    },
    { 
      title: getTranslation('volume24h'), 
      value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, 
      icon: <ThunderboltOutlined /> 
    },
    { 
      title: getTranslation('marketCap'), 
      value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, 
      icon: <DollarCircleOutlined /> 
    },
    { 
      title: getTranslation('allTimeHigh'), 
      value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, 
      icon: <TrophyOutlined /> 
    },
  ];

  const genericStats = [
    { 
      title: getTranslation('numberOfMarkets'), 
      value: cryptoDetails?.numberOfMarkets, 
      icon: <FundOutlined /> 
    },
    { 
      title: getTranslation('numberOfExchanges'), 
      value: cryptoDetails?.numberOfExchanges, 
      icon: <MoneyCollectOutlined /> 
    },
    { 
      title: getTranslation('approvedSupply'), 
      value: cryptoDetails?.supply?.confirmed ? getTranslation('yes') : getTranslation('no'), 
      icon: <ExclamationCircleOutlined /> 
    },
    { 
      title: getTranslation('totalSupply'), 
      value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, 
      icon: <ExclamationCircleOutlined /> 
    },
    { 
      title: getTranslation('circulatingSupply'), 
      value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, 
      icon: <ExclamationCircleOutlined /> 
    },
  ];

  const time = ['24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  // Update the getTranslatedLinkType function
  const getTranslatedLinkType = (type) => {
    // Convert the type to lowercase and replace spaces/special chars with underscore
    const linkType = type.toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')  // replace special chars with underscore
      .replace(/^_+|_+$/g, '');     // remove leading/trailing underscores

    // Try to get the translation
    const translation = getTranslation(`linkType.${linkType}`);
    
    // If no translation found, format the original type nicely
    if (!translation || translation === type) {
      return type.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    }
    
    return translation;
  };

  return (
    <div className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name" style={{ color: 'var(--text-primary)' }}>
          {getTranslation('priceInUSD')
            .replace('{name}', cryptoDetails?.name)
            .replace('{symbol}', cryptoDetails?.symbol)}
        </Title>
        <p style={{ color: 'var(--text-secondary)' }}>
          {getTranslation('livePriceDescription')
            .replace('{name}', cryptoDetails?.name)}
        </p>
      </Col>

      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder={getTranslation('selectTimePeriod')}
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      <LineChart 
        coinHistory={coinHistory} 
        currentPrice={millify(cryptoDetails?.price)} 
        coinName={cryptoDetails?.name} 
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading" style={{ color: 'var(--text-primary)' }}>
              {getTranslation('valueStatistics')
                .replace('{name}', cryptoDetails?.name)}
            </Title>
            <p style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('overview')
                .replace('{name}', cryptoDetails?.name)}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text style={{ color: 'var(--text-secondary)' }}>{icon}</Text>
                <Text style={{ color: 'var(--text-secondary)' }}>{title}</Text>
              </Col>
              <Text className="stats" style={{ color: 'var(--text-primary)' }}>{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading" style={{ color: 'var(--text-primary)' }}>
              {getTranslation('otherStats')}
            </Title>
            <p style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('additionalStats').replace('{name}', cryptoDetails.name)}
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text style={{ color: 'var(--text-secondary)' }}>{icon}</Text>
                <Text style={{ color: 'var(--text-secondary)' }}>{title}</Text>
              </Col>
              <Text className="stats" style={{ color: 'var(--text-primary)' }}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading" style={{ color: 'var(--text-primary)' }}>
            {getTranslation('whatIs').replace('{name}', cryptoDetails.name)}
          </Title>
          <div style={{ color: 'var(--text-secondary)' }}>
            {translatedDescription && HTMLReactParser(translatedDescription)}
          </div>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading" style={{ color: 'var(--text-primary)' }}>
            {getTranslation('links').replace('{name}', cryptoDetails.name)}
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name" style={{ color: 'var(--text-secondary)' }}>
                {getTranslatedLinkType(link.type)}
              </Title>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: 'var(--primary)' }}
              >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </div>
  );
};

export default CryptoDetails;
