import React, { useState, useEffect } from 'react';
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Empty, Alert, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import FilterOptions from './FilterOptions';
import Fuse from 'fuse.js';
import Loader from './Loader';
import { getTranslation } from '../translations';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, error, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    marketCapRange: [0, 1000000000000],
    volumeRange: [0, 1000000000],
    sortBy: 'marketCap'
  });

  // Configure Fuse.js options for fuzzy search
  const fuseOptions = {
    keys: ['name', 'symbol', 'slug'],
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 2,
    shouldSort: true,
    includeScore: true
  };

  useEffect(() => {
    if (cryptosList?.coins) {
      let filteredData = [...cryptosList.coins];

      // Apply search filter
      if (searchTerm) {
        const fuse = new Fuse(cryptosList.coins, fuseOptions);
        const searchResults = fuse.search(searchTerm);
        filteredData = searchResults
          .filter(result => result.score < 0.6)
          .map(result => result.item);

        if (filteredData.length === 0) {
          filteredData = cryptosList.coins.filter(coin => 
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.slug?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }

      // Apply other filters when showAll is false
      if (!showAll) {
        filteredData = filteredData.filter(coin => {
          const price = parseFloat(coin.price);
          const marketCap = parseFloat(coin.marketCap);
          const volume = parseFloat(coin["24hVolume"]);

          return (
            price >= filters.priceRange[0] &&
            price <= filters.priceRange[1] &&
            marketCap >= filters.marketCapRange[0] &&
            marketCap <= filters.marketCapRange[1] &&
            volume >= filters.volumeRange[0] &&
            volume <= filters.volumeRange[1]
          );
        });

        // Apply sorting
        filteredData.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price':
              return parseFloat(b.price) - parseFloat(a.price);
            case 'marketCap':
              return parseFloat(b.marketCap) - parseFloat(a.marketCap);
            case 'volume':
              return parseFloat(b["24hVolume"]) - parseFloat(a["24hVolume"]);
            case 'change':
              return parseFloat(b.change) - parseFloat(a.change);
            default:
              return 0;
          }
        });
      }

      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm, filters, showAll]);

  // Debounce search input
  const handleSearch = (value) => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      marketCapRange: [0, 1000000000000],
      volumeRange: [0, 1000000000],
      sortBy: 'marketCap'
    });
  };

  if (error) {
    return (
      <Alert
        message={getTranslation('error')}
        description={getTranslation('errorDescription')}
        type="error"
        showIcon
      />
    );
  }

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="crypto-controls">
        {!simplified && (
          <>
            <div className="search-crypto">
              <Input
                placeholder={getTranslation('searchPlaceholder')}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                size="large"
                style={{
                  marginBottom: '20px',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              {searchTerm && (
                <div style={{ 
                  color: 'var(--text-secondary)', 
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  {cryptos.length > 0 ? (
                    <p>{getTranslation('showingResults').replace('{count}', cryptos.length).replace('{term}', searchTerm)}</p>
                  ) : (
                    <p>{getTranslation('noResults').replace('{term}', searchTerm)}</p>
                  )}
                  {searchTerm.length > 2 && cryptos.length === 0 && (
                    <p style={{ fontSize: '0.9em', marginTop: '8px' }}>
                      {getTranslation('trySearching')}
                    </p>
                  )}
                </div>
              )}
            </div>
            <FilterOptions 
              onFilterChange={setFilters} 
              resetFilters={resetFilters}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          </>
        )}
        
        {cryptos?.length > 0 ? (
          <div className="crypto-card-container">
            {cryptos.map((currency) => (
              <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
                <Card
                  hoverable
                  className="crypto-card"
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img 
                      className="crypto-image" 
                      src={currency.iconUrl} 
                      alt={currency.name}
                    />
                  }
                >
                  <div className="crypto-details">
                    <p>
                      <span className="label">{getTranslation('price')}:</span>
                      <span className="value">
                        ${millify(parseFloat(currency.price))}
                      </span>
                    </p>
                    <p>
                      <span className="label">{getTranslation('marketCap')}:</span>
                      <span className="value">
                        ${millify(parseFloat(currency.marketCap))}
                      </span>
                    </p>
                    <p>
                      <span className="label">{getTranslation('dailyChange')}:</span>
                      <span className={`value ${parseFloat(currency.change) >= 0 ? 'change-positive' : 'change-negative'}`}>
                        {millify(parseFloat(currency.change))}%
                      </span>
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Empty 
            description={getTranslation('noCryptos')} 
            style={{ margin: '40px 0' }}
          />
        )}
      </div>
    </>
  );
};

export default Cryptocurrencies;
