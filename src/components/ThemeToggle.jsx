import React from 'react';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <BulbOutlined style={{ color: isDarkMode ? 'var(--text-primary)' : '#faad14' }} />
      <Switch
        checked={isDarkMode}
        onChange={(checked) => setIsDarkMode(checked)}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </div>
  );
};

export default ThemeToggle; 