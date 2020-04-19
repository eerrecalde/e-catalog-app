import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GridView } from 'ecatalog';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery, useMutation, queryCache } from 'react-query';
import { listItems } from '../../graphql/queries';
import { deleteItem } from '../../graphql/mutations';
import useLocalStorage from '../../hooks/use-localstorage';
import ItemForm from '../item-form/item-create-form';
import Alert from '../alert/alert';

function ItemsGrid({ id }) {
  const { t } = useTranslation();
  const translations = {};
  const [alert, setAlert] = useState({ show: false });

  const [onDeleteItem] = useMutation(
    (itemId) => API.graphql(graphqlOperation(deleteItem, { input: { id: itemId } })),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (deletedId) => {
        console.log('>>>> deletedId', deletedId);
        const previousValue = queryCache.getQueryData('items-fetch');
        console.log('>>>> previousValue', previousValue);

        queryCache.setQueryData(
          'items-fetch',
          previousValue.filter((el) => el.id !== deletedId),
        );
        console.log('>>>> worked??', queryCache.getQueryData('items-fetch'));

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        console.log('Err', err);
        // error.errors[0].message.toString()
        const {
          errors: [{ message }],
        } = err;
        console.log('Err message', message);
        setAlert({ show: true, msg: message || 'Error', variant: 'danger', closeInSeconds: 0 });
        return queryCache.setQueryData('items-fetch', previousValue);
      },
      onSuccess: () => {
        console.log('Worked');
        // setText('');
        setAlert({
          show: true,
          msg: 'Item removed successfully!',
          variant: 'success',
          closeInSeconds: 3,
        });
      },
      // After success or failure, refetch the items-fetch query
      onSettled: () => {
        setTimeout(() => {
          queryCache.refetchQueries('items-fetch');
        }, 5000);
      },
    },
  );

  // const { isLoading, isError, errorMsg, data } = reqState;
  const { status, data: items = [], error, isFetching } = useQuery('items-fetch', async () => {
    const { data } = await API.graphql({
      query: listItems,
      variables: { owner: { contains: id } },
      authMode: 'API_KEY',
    });

    const { listItems: { items: itms = [] } = [] } = data;
    return itms;
  });
  // const { items } = data;

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

  const handleDelete = (idToDelete) => {
    console.log('Delete', idToDelete);
    onDeleteItem(idToDelete);
  };

  return (
    <>
      <GridView
        loading={status === 'loading'}
        error={status === 'error' ? error.message : ''}
        items={items}
        favorites={favorites}
        onCheckChanged={onFavoriteChanged}
        handleDelete={handleDelete}
        translations={translations}
      />
      <ItemForm />
      <Alert
        show={alert.show}
        text={alert.msg}
        variant={alert.variant || undefined}
        closeInSeconds={alert.closeInSeconds}
        dismissible={alert.dismissible || undefined}
        onAlertClose={() => {
          setAlert({ show: false });
        }}
      />
      <div>{isFetching ? 'Updating in background...' : ' '}</div>
    </>
  );
}

ItemsGrid.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemsGrid;
