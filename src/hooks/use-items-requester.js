import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

import { getItem, listItems } from '../graphql/queries';

const useItemsRequester = initialValues => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    function onBeforeAsync(operation) {
      initialValues.setItemOperation(operation || '');
      setLoading(true);
    }

    function onAfterAsyncSuccess(res) {
      setLoading(false);
      console.table('Success >', res);
    }

    function onAfterAsyncError(err) {
      setLoading(false);
      const errorMsg = typeof err === 'string' ? err : err.errors[0].message;
      console.error('ERROR >', errorMsg);
      setError(errorMsg);
    }

    async function getItemsList(id) {
      onBeforeAsync('');

      API.configure();

      try {
        const res = await API.graphql({
          query: listItems,
          variables: { filter: { owner: { contains: id } } },
          authMode: 'API_KEY',
        });
        setItems(res.data.listItems.items);
        onAfterAsyncSuccess(res);
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    async function getItemById(id) {
      onBeforeAsync('');

      try {
        const res = await API.graphql({ query: getItem, variables: { id }, authMode: 'API_KEY' });
        setItem(res.data.getItem);
        onAfterAsyncSuccess(res);
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    if (!initialValues.itemOperation) {
      return;
    }

    if (initialValues.itemOperation === 'getItems') {
      console.log('gettingItems');
      getItemsList(initialValues.userId);
      return;
    }

    if (initialValues.itemOperation === 'getItemById' && initialValues.item.id) {
      console.log('gettingItem');
      getItemById(initialValues.item.id);
    }
  }, [initialValues]);

  return {
    error,
    loading,
    items,
    item,
  };
};

export default useItemsRequester;
