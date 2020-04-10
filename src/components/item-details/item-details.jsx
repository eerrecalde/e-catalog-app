import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useItemsRequester from '../../hooks/use-items-requester';
import ItemDetailsView from './item-details-view';

function ItemDetails({ id }) {
  const [itemOperation, setItemOperation] = useState('getItemById');

  const { error, loading, item } = useItemsRequester(
    {
      item: { id },
      itemOperation,
      setItemOperation,
    },
    (msg) => {
      console.log('done', msg);
    },
    [],
  );

  return (
    <div className="container">
      { loading ? (<p>Loading...</p>) : '' }
      { error ? (<p>{error}</p>) : '' }

      {item ? (
        <ItemDetailsView
          title={item.title}
          price={item.price}
          description={item.description}
          url={item.url}
          imgUrl={item.imgUrl}
        />
      ) : (
        <div>
        No data found
        </div>
      )}
    </div>
  );
}

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemDetails;
