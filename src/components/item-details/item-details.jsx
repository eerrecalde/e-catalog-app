import React from 'react';
import PropTypes from 'prop-types';

function ItemView({
  title, price, description, url, imgUrl,
}) {
  return (
    <div className="container">
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
};

ItemView.defaultProps = {
  title: '',
  price: 0,
  description: '',
  url: '',
  imgUrl: 'https://www.placehold.it/300x200',
};

export default ItemView;
