import React, { useState } from 'react';
import useItemsRequester from '../../hooks/use-items-requester';
import ItemsGridView from './grid.view';

function ItemsGrid() {
  const [itemOperation, setItemOperation] = useState('getItems');
  function getParsedStr(str) {
    let arr = [];

    arr = str.split(',');

    return arr;
  }

  const favoritesStr = localStorage.getItem('favorites');

  let currentFavorites = (favoritesStr ? getParsedStr(favoritesStr) : []);

  const { error, loading, items } = useItemsRequester(
    { itemOperation, setItemOperation },
    msg => {
      console.log('done', msg);
    },
    [],
  );

  function onCheckChanged(e) {
    if (currentFavorites.indexOf(e) > -1) {
      currentFavorites = currentFavorites.filter(el => el !== e);
    } else {
      currentFavorites = [...currentFavorites, e];
    }

    localStorage.setItem('favorites', currentFavorites);
  }

  return (
    <ItemsGridView
      loading={loading}
      error={error}
      items={items}
      favorites={currentFavorites}
      onCheckChanged={onCheckChanged}
    />
  );
}

export default ItemsGrid;
