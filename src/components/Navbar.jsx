import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar, Dropdown, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  WalletOutlined,
  TranslationOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import icon from "../assets/cryptocurrency.png";
import { getTranslation } from '../translations';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar 
          src={icon} 
          size="large" 
          style={{
            filter: isDarkMode ? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)' : 'brightness(0)',
            transition: 'filter 0.3s ease'
          }}
        />
        <Typography.Title level={4} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>

        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined style={{ color: 'var(--text-primary)' }} />
        </Button>
      </div>

      {activeMenu && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Menu theme={isDarkMode ? 'dark' : 'light'}>
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">{getTranslation('home')}</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">{getTranslation('cryptocurrencies')}</Link>
            </Menu.Item>
            <Menu.Item icon={<WalletOutlined />}>
              <Link to="/portfolio">{getTranslation('portfolio')}</Link>
            </Menu.Item>
            <Menu.Item icon={<TranslationOutlined />}>
              <Link to="/filter-guide">{getTranslation('filterGuide')}</Link>
            </Menu.Item>
          </Menu>

          <div style={{ 
            marginTop: 'auto', 
            padding: '16px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bgSecondary)',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserOutlined />
                <span>{currentUser.name}</span>
              </div>
              <Button 
                type="text" 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                style={{ color: 'var(--text-primary)' }}
              >
                {getTranslation('logout')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
