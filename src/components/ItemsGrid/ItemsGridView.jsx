import React from 'react';
import PropTypes from 'prop-types';
import GridItem from '../GridItem/GridItem';

function ItemsGridView({ items }) {
  return (
    <ul className="ItemsGridView">
      {items.map(i => (
        <li key={i.id}>
          <GridItem id={i.id} title={i.title} />
        </li>
      ))}
    </ul>
  );
}

ItemsGridView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemsGridView;
