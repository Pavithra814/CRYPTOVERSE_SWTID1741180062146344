import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageToggle = () => {
  const [language, setLanguage] = React.useState(
    localStorage.getItem('preferredLanguage') || 'en'
  );

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem('preferredLanguage', value);
    window.location.reload(); // Reload to apply translations
  };

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <GlobalOutlined style={{ color: 'var(--text-primary)' }} />
      <Select
        value={language}
        onChange={handleLanguageChange}
        style={{ 
          width: 100,
          marginLeft: '4px'
        }}
        dropdownStyle={{
          background: 'var(--bgSecondary)',
          borderColor: 'var(--border)'
        }}
      >
        <Option value="en">English</Option>
        <Option value="ta">தமிழ்</Option>
      </Select>
    </div>
  );
};

export default LanguageToggle; 