import React from 'react';
import { Typography, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import icon from "../assets/cryptocurrency.png";
import { getTranslation } from '../translations';

const { Title } = Typography;

const Splash = () => {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: 'var(--primary)'
      }}
      spin
    />
  );

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bgPrimary)',
      gap: '30px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <img 
          src={icon} 
          alt="cryptocurrency" 
          style={{
            width: '120px',
            height: '120px',
            animation: 'pulse 2s infinite',
            filter: isDarkMode ? 'invert(1)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        />
        <Title level={2} style={{ 
          color: 'var(--text-primary)',
          margin: 0,
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}>
          {getTranslation('welcomeToCryptoverse')}
        </Title>
      </div>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Splash; 