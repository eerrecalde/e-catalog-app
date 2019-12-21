import React from 'react';
import PropTypes from 'prop-types';

const currencies = [
  {
    id: 'GBP',
    symbol: '£',
  },
  {
    id: 'EUR',
    symbol: '€',
  },
  {
    id: 'USD',
    symbol: '$',
  },
  {
    id: 'ARP',
    symbol: 'ar$',
  },
];

const defaultCurrency = currencies[0];

function Currency({ type }) {
  const currency = currencies.find(c => c.id === type) || defaultCurrency;
  return (
    <span>{ currency.symbol }</span>
  );
}

Currency.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Currency;
