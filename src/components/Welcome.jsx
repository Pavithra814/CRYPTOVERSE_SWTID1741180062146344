import React from 'react';
import { Card, Button, Typography, Row, Col } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTranslation } from '../translations';

const { Title, Text } = Typography;

const Welcome = () => {
  return (
    <div className="welcome-container" style={{ 
      maxWidth: 800, 
      margin: '40px auto', 
      padding: '0 20px',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card style={{ 
        background: 'var(--bgSecondary)', 
        border: '1px solid var(--border)',
        textAlign: 'center',
        width: '100%',
        padding: '2rem'
      }}>
        <Title level={2} style={{ 
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}>
          {getTranslation('welcomeTitle')}
        </Title>
        <Text style={{ 
          color: 'var(--text-secondary)', 
          display: 'block', 
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          {getTranslation('welcomeDescription')}
        </Text>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} style={{ maxWidth: 300 }}>
            <Link to="/login">
              <Button 
                type="primary" 
                size="large" 
                block 
                icon={<LoginOutlined />}
                style={{ height: '45px', fontSize: '16px' }}
              >
                {getTranslation('login')}
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={12} style={{ maxWidth: 300 }}>
            <Link to="/signup">
              <Button 
                size="large" 
                block 
                icon={<UserAddOutlined />}
                style={{ height: '45px', fontSize: '16px' }}
              >
                {getTranslation('signup')}
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Welcome; 