import React from 'react';
import PropTypes from 'prop-types';

function ItemView({
  title, price, description, url, imgUrl, loading, error,
}) {
  return (
    <div className="container">
      { loading ? (<p>Loading...</p>) : '' }
      { error ? (<p>{error}</p>) : '' }
      <h3>{title}</h3>
      <h4>{price}</h4>
      <p>{description}</p>
      <p>{url}</p>
      <p>{imgUrl}</p>
    </div>
  );
}

ItemView.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  url: PropTypes.string,
  imgUrl: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

ItemView.defaultProps = {
  title: '',
  price: 0,
  description: '',
  url: '',
  imgUrl: 'https://www.placehold.it/300x200',
  loading: false,
  error: 'Something went wrong',
};

export default ItemView;
