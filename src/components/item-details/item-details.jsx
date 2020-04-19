import React from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { useQuery } from 'react-query';
import { getItem } from '../../graphql/queries';
import ItemDetailsView from './item-details-view';

function ItemDetails({ id }) {
  const { status, data: item, error, isFetching } = useQuery('item-fetch', async () => {
    const { data } = await API.graphql({
      query: getItem,
      variables: { id },
      authMode: 'API_KEY',
    });
    return data.getItem || null;
  });

  return (
    <div className="container">
      {status === 'loading' ? 'Loading...' : ''}
      {status === 'error' ? error.message : ''}
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
      <div>{isFetching ? 'Updating in background...' : ' '}</div>
    </div>
  );
}

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemDetails;
