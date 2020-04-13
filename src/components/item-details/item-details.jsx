import React from 'react';
import PropTypes from 'prop-types';
import { useFetchData } from '../../hooks/use-fetch-data';
import ItemDetailsView from './item-details-view';

function ItemDetails({ id }) {
  const [itemDataState] = useFetchData(
    {
      queryId: 'getItem',
      variables: { id },
    },
    null,
  );

  const { isLoading, isError, errorMsg, data: item } = itemDataState;

  return (
    <div className="container">
      {isLoading ? <p>Loading...</p> : ''}
      {isError ? <p>{errorMsg}</p> : ''}

      {item ? (
        <ItemDetailsView
          title={item.title}
          price={item.price}
          description={item.description}
          url={item.url}
          imgUrl={item.imgUrl}
        />
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
}

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemDetails;
