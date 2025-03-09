import React from 'react';
import { Card, Slider, Select, Row, Col, Button, Switch } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { getTranslation } from '../translations';

const { Option } = Select;

const FilterOptions = ({ onFilterChange, resetFilters, showAll, setShowAll }) => {
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [marketCapRange, setMarketCapRange] = React.useState([0, 1000000000000]);
  const [volumeRange, setVolumeRange] = React.useState([0, 1000000000]);
  const [sortBy, setSortBy] = React.useState('marketCap');
  const [sortOrder, setSortOrder] = React.useState('descending');

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ priceRange: value, marketCapRange, volumeRange, sortBy, sortOrder });
  };

  const handleMarketCapChange = (value) => {
    setMarketCapRange(value);
    onFilterChange({ priceRange, marketCapRange: value, volumeRange, sortBy, sortOrder });
  };

  const handleVolumeChange = (value) => {
    setVolumeRange(value);
    onFilterChange({ priceRange, marketCapRange, volumeRange: value, sortBy, sortOrder });
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    onFilterChange({ priceRange, marketCapRange, volumeRange, sortBy: value, sortOrder });
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    onFilterChange({ priceRange, marketCapRange, volumeRange, sortBy, sortOrder: value });
  };

  return (
    <Card 
      title={<span style={{ color: 'var(--text-primary)' }}>{getTranslation('filterBy')}</span>}
      style={{ 
        marginBottom: 24,
        background: 'var(--bgPrimary)',
        border: '1px solid var(--border)'
      }}
      extra={
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch
            checked={showAll}
            onChange={setShowAll}
            checkedChildren={<span style={{ color: '#fff' }}>{getTranslation('showAllCoins')}</span>}
            unCheckedChildren={<span style={{ color: '#fff' }}>{getTranslation('showAllCoins')}</span>}
          />
          <Button 
            icon={<ReloadOutlined style={{ color: 'var(--text-primary)' }} />} 
            onClick={resetFilters}
            type="text"
            style={{ color: 'var(--text-primary)' }}
          >
            {getTranslation('resetFilter')}
          </Button>
        </div>
      }
    >
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="filter-section">
            <h4 style={{ color: 'var(--text-primary)' }}>{getTranslation('priceRange')}</h4>
            <Slider
              range
              min={0}
              max={100000}
              value={priceRange}
              onChange={handlePriceChange}
              tipFormatter={(value) => `$${value}`}
              disabled={showAll}
            />
            <div className="range-values" style={{ color: 'var(--text-secondary)' }}>
              <span>{getTranslation('min')}: ${priceRange[0]}</span>
              <span>{getTranslation('max')}: ${priceRange[1]}</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="filter-section">
            <h4 style={{ color: 'var(--text-primary)' }}>{getTranslation('marketCapRange')}</h4>
            <Slider
              range
              min={0}
              max={1000000000000}
              value={marketCapRange}
              onChange={handleMarketCapChange}
              tipFormatter={(value) => `$${value}`}
              disabled={showAll}
            />
            <div className="range-values" style={{ color: 'var(--text-secondary)' }}>
              <span>{getTranslation('min')}: ${marketCapRange[0]}</span>
              <span>{getTranslation('max')}: ${marketCapRange[1]}</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="filter-section">
            <h4 style={{ color: 'var(--text-primary)' }}>{getTranslation('volume')}</h4>
            <Slider
              range
              min={0}
              max={1000000000}
              value={volumeRange}
              onChange={handleVolumeChange}
              tipFormatter={(value) => `$${value}`}
              disabled={showAll}
            />
            <div className="range-values" style={{ color: 'var(--text-secondary)' }}>
              <span>{getTranslation('min')}: ${volumeRange[0]}</span>
              <span>{getTranslation('max')}: ${volumeRange[1]}</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="filter-section">
            <h4 style={{ color: 'var(--text-primary)' }}>{getTranslation('sortBy')}</h4>
            <Select
              style={{ width: '100%' }}
              value={sortBy}
              onChange={handleSortByChange}
              dropdownStyle={{ background: 'var(--bgSecondary)' }}
            >
              <Option value="price">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('price')}</span>
              </Option>
              <Option value="marketCap">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('marketCapital')}</span>
              </Option>
              <Option value="volume">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('volume')}</span>
              </Option>
              <Option value="change">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('dailyChange')}</span>
              </Option>
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="filter-section">
            <h4 style={{ color: 'var(--text-primary)' }}>{getTranslation('sortBy')}</h4>
            <Select
              style={{ width: '100%' }}
              value={sortOrder}
              onChange={handleSortOrderChange}
              dropdownStyle={{ background: 'var(--bgSecondary)' }}
            >
              <Option value="ascending">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('ascending')}</span>
              </Option>
              <Option value="descending">
                <span style={{ color: 'var(--text-primary)' }}>{getTranslation('descending')}</span>
              </Option>
            </Select>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterOptions; 