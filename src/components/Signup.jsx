import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTranslation } from '../translations';

const { Title } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = savedUsers.some(u => u.email === values.email);
      
      if (userExists) {
        message.error(getTranslation('emailExists'));
        setLoading(false);
        return;
      }

      // Generate OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(newOtp.toString());
      setUserDetails(values);
      setShowOtpVerification(true);
      message.success(getTranslation('otpSent') + newOtp); // In development mode, showing OTP
      setLoading(false);
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      savedUsers.push(userDetails);
      localStorage.setItem('users', JSON.stringify(savedUsers));
      message.success(getTranslation('signupSuccess'));
      window.location.href = '/login';
    } else {
      message.error(getTranslation('invalidOtp'));
    }
  };

  const validateEmail = (email) => {
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
          {getTranslation('signup')}
        </Title>

        {!showOtpVerification ? (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: getTranslation('nameRequired') }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder={getTranslation('name')}
                style={{ color: 'var(--text-primary)' }}
              />
            </Form.Item>

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
              rules={[
                { required: true, message: getTranslation('passwordRequired') },
                { min: 6, message: getTranslation('passwordLength') }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder={getTranslation('password')}
                style={{ color: 'var(--text-primary)' }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: getTranslation('confirmPasswordRequired') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(getTranslation('passwordsMismatch'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder={getTranslation('confirmPassword')}
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
                {getTranslation('signup')}
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
              {getTranslation('alreadyHaveAccount')}{' '}
              <Link to="/login" style={{ color: 'var(--primary)' }}>
                {getTranslation('login')}
              </Link>
            </div>
          </Form>
        ) : (
          <div>
            <Input
              placeholder={getTranslation('enterOtp')}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginBottom: 16, color: 'var(--text-primary)' }}
            />
            <Button 
              type="primary" 
              block 
              onClick={verifyOtp}
              style={{ marginBottom: 16 }}
            >
              {getTranslation('verifyOtp')}
            </Button>
            <Button 
              block 
              onClick={() => setShowOtpVerification(false)}
            >
              {getTranslation('back')}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Signup; 