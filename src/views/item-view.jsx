import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from '../components/item-details/item-details';
import useItemsRequester from '../hooks/use-items-requester';

function ItemView() {
  const { id } = useParams();
  const [itemOperation, setItemOperation] = useState('getItemById');

  const { error, loading, items: item } = useItemsRequester(
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
    <div>
      { loading ? (<p>Loading...</p>) : '' }
      { error ? (<p>{error}</p>) : '' }
      <ItemDetails
        title={item.title}
        price={item.price}
        description={item.description}
        url={item.url}
        imgUrl={item.imgUrl}
      />
    </div>
  );
}

export default ItemView;
