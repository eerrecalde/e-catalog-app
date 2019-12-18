import React, { useState } from 'react';
import useItemsRequester from '../../hooks/use-items-requester';
import ItemsGridView from './ItemsGridView';

function ItemsGrid() {
  const [item] = useState({
    title: '',
    description: '',
  });

  const { error, loading, items } = useItemsRequester(
    {},
    msg => {
      console.log('done', msg);
    },
    [],
  );

  console.log('error, loading', error, loading, item);

  return (
    <ItemsGridView items={items} />
  );
}

export default ItemsGrid;
