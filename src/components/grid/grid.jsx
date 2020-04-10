import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GridView } from 'ecatalog';
import useItemsRequester from '../../hooks/use-items-requester';

function ItemsGrid({ id }) {
  const { t } = useTranslation();
  const translations = {};
  const [itemOperation, setItemOperation] = useState('getItems');
  function getParsedStr(str) {
    let arr = [];

    arr = str.split(',');

    return arr;
  }

  const favoritesStr = localStorage.getItem('favorites');

  let currentFavorites = (favoritesStr ? getParsedStr(favoritesStr) : []);

  const { error, loading, items } = useItemsRequester(
    { userId: id, itemOperation, setItemOperation },
    msg => {
      console.log('done', msg);
    },
    [],
  );

  translations['catalog.item.view'] = t('catalog.item.view');
  translations['catalog.item.external'] = t('catalog.item.external');

  function onCheckChanged(e) {
    if (currentFavorites.indexOf(e) > -1) {
      currentFavorites = currentFavorites.filter(el => el !== e);
    } else {
      currentFavorites = [...currentFavorites, e];
    }

    localStorage.setItem('favorites', currentFavorites);
  }

  return (
    <GridView
      loading={loading}
      error={error}
      items={items}
      favorites={currentFavorites}
      onCheckChanged={onCheckChanged}
      translations={translations}
    />
  );
}

ItemsGrid.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemsGrid;
