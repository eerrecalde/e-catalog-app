import React from 'react';
import PropTypes from 'prop-types';

function GridItem({ title }) {
  return (
    <div>{title}</div>
  );
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GridItem;
