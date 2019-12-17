import React, { useState } from 'react';
import useItemsRequester from '../hooks/use-items-requester';
import GridItem from './GridItem';

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
    <ul className="ItemsGrid">
      {items.map(i => (
        <li key={i.id}>
          <GridItem title={i.title} />
        </li>
      ))}
    </ul>
  );
}

export default ItemsGrid;
