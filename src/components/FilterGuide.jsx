import React from 'react';
import { Card, Typography, Row, Col, Divider } from 'antd';
import { getTranslation } from '../translations';

const { Title, Text, Paragraph } = Typography;

const FilterGuide = () => {
  return (
    <div className="filter-guide-container">
      <Title level={1} style={{ color: 'var(--text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
        {getTranslation('filterGuideTitle')}
      </Title>
      
      <Paragraph style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem' }}>
        {getTranslation('filterGuideDescription')}
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card 
            title={getTranslation('priceFilterTitle')}
            style={{ background: 'var(--bgSecondary)', border: '1px solid var(--border)' }}
            headStyle={{ color: 'var(--text-primary)' }}
          >
            <Text style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('priceFilterDesc')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title={getTranslation('marketCapFilterTitle')}
            style={{ background: 'var(--bgSecondary)', border: '1px solid var(--border)' }}
            headStyle={{ color: 'var(--text-primary)' }}
          >
            <Text style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('marketCapFilterDesc')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title={getTranslation('volumeFilterTitle')}
            style={{ background: 'var(--bgSecondary)', border: '1px solid var(--border)' }}
            headStyle={{ color: 'var(--text-primary)' }}
          >
            <Text style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('volumeFilterDesc')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title={getTranslation('sortingTitle')}
            style={{ background: 'var(--bgSecondary)', border: '1px solid var(--border)' }}
            headStyle={{ color: 'var(--text-primary)' }}
          >
            <Text style={{ color: 'var(--text-secondary)' }}>
              {getTranslation('sortingDesc')}
            </Text>
          </Card>
        </Col>
      </Row>

      <Divider style={{ borderColor: 'var(--border)', margin: '3rem 0' }} />

      <Card 
        title={getTranslation('howToUse')}
        style={{ 
          background: 'var(--bgSecondary)', 
          border: '1px solid var(--border)',
          marginBottom: '2rem'
        }}
        headStyle={{ color: 'var(--text-primary)' }}
      >
        <div style={{ color: 'var(--text-secondary)' }}>
          <Paragraph>{getTranslation('step1')}</Paragraph>
          <Paragraph>{getTranslation('step2')}</Paragraph>
          <Paragraph>{getTranslation('step3')}</Paragraph>
          <Paragraph>{getTranslation('step4')}</Paragraph>
          <Paragraph>{getTranslation('step5')}</Paragraph>
        </div>
      </Card>

      <Card 
        style={{ 
          background: 'var(--bgSecondary)', 
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--primary)'
        }}
      >
        <Text style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          {getTranslation('filterTip')}
        </Text>
      </Card>
    </div>
  );
};

export default FilterGuide; 