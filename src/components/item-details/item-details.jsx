import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useItemsRequester from '../../hooks/use-items-requester';

function ItemView({ id }) {
  const [itemOperation, setItemOperation] = useState('getItemById');

  const { error, loading, item } = useItemsRequester(
    {
      item: { id },
      itemOperation,
      setItemOperation,
    },
    msg => {
      console.log('done', msg);
    },
    [],
  );

  return (
    <div className="container">
      { loading ? (<p>Loading...</p>) : '' }
      { error ? (<p>{error}</p>) : '' }

      {item ? (
        <div>
          <h4>{item.title}</h4>
          <h5>{item.price}</h5>
          <p>{item.description}</p>
          <p>{item.url}</p>
          <p>{item.imgUrl}</p>
        </div>
      ) : (
        <div>
        No data found
        </div>
      )}
    </div>
  );
}

ItemView.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemView;
