import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GridView } from 'ecatalog';
// import useItemsRequester from '../../hooks/use-items-requester';
import { useFetchData } from '../../hooks/use-fetch-data';
import useLocalStorage from '../../hooks/use-localstorage';

function ItemsGrid({ id }) {
  const { t } = useTranslation();
  const translations = {};

  const [reqState] = useFetchData(
    {
      queryId: 'listItems',
      variables: { owner: { contains: id } },
    },
    { items: [] },
  );

  const { isLoading, isError, errorMsg, data } = reqState;
  const { items } = data;

  translations['catalog.item.view'] = t('catalog.item.view');
  translations['catalog.item.external'] = t('catalog.item.external');

  const [favoritesStr, setFavorites] = useLocalStorage('favorites');
  const favorites = favoritesStr.length ? favoritesStr.split(',') : [];
  function onFavoriteChanged(e) {
    if (favorites.indexOf(e) > -1) {
      setFavorites(favorites.filter((el) => el !== e));
    } else {
      setFavorites([...favorites, e]);
    }
  }

  return (
    <GridView
      loading={isLoading}
      error={isError ? errorMsg : ''}
      items={items}
      favorites={favorites}
      onCheckChanged={onFavoriteChanged}
      translations={translations}
    />
  );
}

ItemsGrid.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemsGrid;
