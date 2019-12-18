import React from 'react';
import PropTypes from 'prop-types';

function GridItem({ id, title, price }) {
  return (
    <div>
      <small>{id}</small>
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number,
};

GridItem.defaultProps = {
  price: 0,
};

export default GridItem;
