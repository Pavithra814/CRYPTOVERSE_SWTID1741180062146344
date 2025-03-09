import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTranslation } from '../translations';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = savedUsers.find(u => u.email === values.email && u.password === values.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        message.success(getTranslation('loginSuccess'));
        window.location.href = '/';
      } else {
        message.error(getTranslation('invalidCredentials'));
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      message.error(getTranslation('enterEmail'));
      return;
    }

    // Simulate sending reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    message.success(getTranslation('resetCodeSent') + resetCode);
    localStorage.setItem('resetCode', resetCode);
  };

  const validateEmail = (email) => {
    // Gmail-specific validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  return (
    <div style={{ 
      maxWidth: 400, 
      margin: '40px auto', 
      padding: '0 20px' 
    }}>
      <Card style={{ 
        background: 'var(--bgSecondary)', 
        border: '1px solid var(--border)' 
      }}>
        <Title level={2} style={{ 
          textAlign: 'center', 
          color: 'var(--text-primary)',
          marginBottom: 30 
        }}>
          {getTranslation('login')}
        </Title>

        {!showForgotPassword ? (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: getTranslation('emailRequired') },
                {
                  validator: async (_, value) => {
                    if (value && !validateEmail(value)) {
                      throw new Error(getTranslation('invalidGmail'));
                    }
                  },
                }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="example@gmail.com"
                style={{ color: 'var(--text-primary)' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: getTranslation('passwordRequired') }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder={getTranslation('password')}
                style={{ color: 'var(--text-primary)' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
              >
                {getTranslation('login')}
              </Button>
            </Form.Item>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              color: 'var(--text-primary)' 
            }}>
              <Link to="/signup" style={{ color: 'var(--primary)' }}>
                {getTranslation('newUser')}
              </Link>
              <Button 
                type="link" 
                onClick={() => setShowForgotPassword(true)}
                style={{ color: 'var(--primary)' }}
              >
                {getTranslation('forgotPassword')}
              </Button>
            </div>
          </Form>
        ) : (
          <div>
            <Input
              prefix={<MailOutlined />}
              placeholder="example@gmail.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              style={{ marginBottom: 16, color: 'var(--text-primary)' }}
            />
            <Button 
              type="primary" 
              block 
              onClick={() => {
                if (!validateEmail(resetEmail)) {
                  message.error(getTranslation('invalidGmail'));
                  return;
                }
                handleForgotPassword();
              }}
              style={{ marginBottom: 16 }}
            >
              {getTranslation('sendResetCode')}
            </Button>
            <Button 
              block 
              onClick={() => setShowForgotPassword(false)}
            >
              {getTranslation('backToLogin')}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login; 