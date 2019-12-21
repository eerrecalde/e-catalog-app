import React from 'react';
import PropTypes from 'prop-types';

function ItemFormView({ item }) {
  return (
    <div>
      <h2>ITEM FORM</h2>
      <pre>{JSON.stringify(item)}</pre>
    </div>
  );
}

ItemFormView.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
  }),
};

ItemFormView.defaultProps = {
  item: {},
};

export default ItemFormView;
