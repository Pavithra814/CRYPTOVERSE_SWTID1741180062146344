import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Table, Typography, Statistic, Row, Col, Modal, Form, Select, DatePicker, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import millify from 'millify';
import { getTranslation } from '../translations';

const { Title } = Typography;
const { Option } = Select;

const PortfolioTracker = ({ cryptoData }) => {
  const [holdings, setHoldings] = useState(() => {
    const savedHoldings = localStorage.getItem('cryptoHoldings');
    return savedHoldings ? JSON.parse(savedHoldings) : [];
  });
  
  const [newHolding, setNewHolding] = useState({
    coinId: '',
    amount: '',
    buyPrice: ''
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('cryptoHoldings', JSON.stringify(holdings));
  }, [holdings]);

  const addHolding = () => {
    if (newHolding.coinId && newHolding.amount && newHolding.buyPrice) {
      const coin = cryptoData.find(c => c.uuid === newHolding.coinId);
      if (coin) {
        setHoldings([...holdings, {
          ...newHolding,
          coinName: coin.name,
          coinSymbol: coin.symbol,
          currentPrice: parseFloat(coin.price),
          id: Date.now()
        }]);
        setNewHolding({ coinId: '', amount: '', buyPrice: '' });
      }
    }
  };

  const removeHolding = (holdingId) => {
    setHoldings(holdings.filter(h => h.id !== holdingId));
  };

  const calculatePortfolioStats = () => {
    let totalValue = 0;
    let totalInvestment = 0;

    holdings.forEach(holding => {
      const coin = cryptoData.find(c => c.uuid === holding.coinId);
      if (coin) {
        const currentValue = parseFloat(holding.amount) * parseFloat(coin.price);
        const investmentValue = parseFloat(holding.amount) * parseFloat(holding.buyPrice);
        totalValue += currentValue;
        totalInvestment += investmentValue;
      }
    });

    const totalProfit = totalValue - totalInvestment;
    const profitPercentage = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

    return {
      totalValue,
      totalInvestment,
      totalProfit,
      profitPercentage
    };
  };

  const portfolioStats = calculatePortfolioStats();

  const columns = [
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('coin')}
        </span>
      ),
      dataIndex: 'coinName',
      key: 'coinName',
      render: (text) => (
        <span style={{ color: 'var(--text-primary)' }}>{text}</span>
      ),
    },
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('holdings')}
        </span>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span style={{ color: 'var(--text-primary)' }}>
          {amount} {record.coinSymbol}
        </span>
      ),
    },
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('buyPrice')}
        </span>
      ),
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      render: (price) => (
        <span style={{ color: 'var(--text-primary)' }}>
          ${millify(parseFloat(price))}
        </span>
      ),
    },
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('currentPrice')}
        </span>
      ),
      key: 'currentPrice',
      render: (_, record) => {
        const coin = cryptoData.find(c => c.uuid === record.coinId);
        return (
          <span style={{ color: 'var(--text-primary)' }}>
            ${millify(parseFloat(coin?.price || 0))}
          </span>
        );
      },
    },
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('profitLoss')}
        </span>
      ),
      key: 'profitLoss',
      render: (_, record) => {
        const coin = cryptoData.find(c => c.uuid === record.coinId);
        if (coin) {
          const currentValue = parseFloat(record.amount) * parseFloat(coin.price);
          const investmentValue = parseFloat(record.amount) * parseFloat(record.buyPrice);
          const profit = currentValue - investmentValue;
          const percentage = (profit / investmentValue) * 100;
          const color = profit >= 0 ? '#10b981' : '#ef4444';
          return (
            <span style={{ color }}>
              {profit >= 0 ? '+' : ''}{millify(percentage)}%
            </span>
          );
        }
        return '-';
      },
    },
    {
      title: (
        <span style={{ color: 'var(--text-primary)' }}>
          {getTranslation('action')}
        </span>
      ),
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeHolding(record.id)}
          danger
        />
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success(getTranslation('holdingAdded'));
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className="portfolio-tracker">
      <Row gutter={[24, 24]} className="portfolio-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>
                {getTranslation('totalValue')}
              </span>}
              value={portfolioStats.totalValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>
                {getTranslation('totalInvestment')}
              </span>}
              value={portfolioStats.totalInvestment}
              precision={2}
              prefix="$"
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>
                {getTranslation('totalProfitLoss')}
              </span>}
              value={portfolioStats.totalProfit}
              precision={2}
              prefix="$"
              valueStyle={{ 
                color: portfolioStats.totalProfit >= 0 ? '#10b981' : '#ef4444'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>
                {getTranslation('profitLossPercentage')}
              </span>}
              value={portfolioStats.profitPercentage}
              precision={2}
              suffix="%"
              valueStyle={{ 
                color: portfolioStats.profitPercentage >= 0 ? '#10b981' : '#ef4444'
              }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        className="add-holding-card"
        title={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('addNewHolding')}</span>}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8}>
            <select
              value={newHolding.coinId}
              onChange={(e) => setNewHolding({ ...newHolding, coinId: e.target.value })}
              className="coin-select"
            >
              <option value="">{getTranslation('selectCoin')}</option>
              {cryptoData?.map(coin => (
                <option key={coin.uuid} value={coin.uuid}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </Col>
          <Col xs={24} sm={6}>
            <Input
              placeholder={getTranslation('enterAmount')}
              type="number"
              value={newHolding.amount}
              onChange={(e) => setNewHolding({ ...newHolding, amount: e.target.value })}
              style={{ color: 'var(--text-primary)' }}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Input
              placeholder={getTranslation('enterBuyPrice')}
              type="number"
              value={newHolding.buyPrice}
              onChange={(e) => setNewHolding({ ...newHolding, buyPrice: e.target.value })}
              style={{ color: 'var(--text-primary)' }}
            />
          </Col>
          <Col xs={24} sm={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addHolding}
              block
            >
              {getTranslation('addHolding')}
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={holdings}
        rowKey="id"
        className="holdings-table"
      />

      <Modal
        title={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('addNewHolding')}</span>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {getTranslation('cancel')}
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            {getTranslation('addHolding')}
          </Button>
        ]}
        style={{ 
          background: 'var(--bgPrimary)',
          border: '1px solid var(--border)'
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="coin"
            label={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('selectCrypto')}</span>}
            rules={[{ required: true, message: getTranslation('required') }]}
          >
            <Select 
              placeholder={getTranslation('selectCoin')}
              style={{ width: '100%' }}
            >
              {cryptoData?.map((coin) => (
                <Option key={coin.uuid} value={coin.uuid}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('amount')}</span>}
            rules={[
              { required: true, message: getTranslation('required') },
              { type: 'number', min: 0, message: getTranslation('invalidAmount') }
            ]}
          >
            <Input 
              type="number" 
              placeholder={getTranslation('enterAmount')}
              style={{ color: 'var(--text-primary)' }}
            />
          </Form.Item>

          <Form.Item
            name="buyPrice"
            label={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('buyPrice')}</span>}
            rules={[
              { required: true, message: getTranslation('required') },
              { type: 'number', min: 0, message: getTranslation('invalidPrice') }
            ]}
          >
            <Input 
              type="number" 
              placeholder={getTranslation('enterBuyPrice')}
              prefix="$"
              style={{ color: 'var(--text-primary)' }}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('purchaseDate')}</span>}
            rules={[{ required: true, message: getTranslation('required') }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder={getTranslation('date')}
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('notes')}</span>}
          >
            <Input.TextArea 
              placeholder={getTranslation('addNotes')}
              style={{ color: 'var(--text-primary)' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PortfolioTracker; 