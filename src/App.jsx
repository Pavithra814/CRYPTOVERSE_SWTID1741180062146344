import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import {
  Navbar,
  CryptoDetails,
  Cryptocurrencies,
  Home,
  Portfolio,
  Welcome,
  Splash
} from "./components";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import FilterGuide from './components/FilterGuide';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css";
import { getTranslation } from './translations';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set initial language from localStorage
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    localStorage.setItem('preferredLanguage', savedLang);

    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  const currentUser = localStorage.getItem('currentUser');

  return (
    <div className="app">
      <div className="theme-language-toggle" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'var(--bgSecondary)',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: 'var(--card-shadow)'
      }}>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {currentUser && (
        <div className="navbar">
          <Navbar />
        </div>
      )}

      <div className="main" style={{ 
        minHeight: '100vh',
        background: 'var(--bgPrimary)'
      }}>
        <Layout style={{ 
          background: 'var(--bgPrimary)',
          minHeight: '100vh'
        }}>
          <div className="routes">
            <Routes>
              <Route path="/" element={currentUser ? <Home /> : <Welcome />} />
              <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
              
              <Route path="/cryptocurrencies" element={
                <ProtectedRoute>
                  <Cryptocurrencies />
                </ProtectedRoute>
              } />
              
              <Route path="/crypto/:coinId" element={
                <ProtectedRoute>
                  <CryptoDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              } />
              
              <Route path="/filter-guide" element={
                <ProtectedRoute>
                  <FilterGuide />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <h1 className="footer-heading">
            {getTranslation('cryptoInsights')}
          </h1>
          <p style={{ color: 'white', textAlign: 'center', marginTop: '12px' }}>
            {getTranslation('stayInformed')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
