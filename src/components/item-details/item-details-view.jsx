import React from 'react';
import PropTypes from 'prop-types';

function ItemDetailsView({
  title, price, description, url, imgUrl,
}) {
  return (
    <div className="container">
      <div>
        <h4>{title}</h4>
        <h5>{price}</h5>
        <p>{description}</p>
        <p>{url}</p>
        <p>{imgUrl}</p>
      </div>
    </div>
  );
}

ItemDetailsView.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number,
  description: PropTypes.string,
  url: PropTypes.string,
  imgUrl: PropTypes.string,
};

ItemDetailsView.defaultProps = {
  price: 0,
  description: '',
  url: '',
  imgUrl: '',
};

export default ItemDetailsView;
