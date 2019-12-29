import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

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
      setError(err.errors[0].message);
      setLoading(false);
      console.error('ERROR >', err.errors[0].message);
    }

    async function getItemsList() {
      onBeforeAsync('');

      try {
        const res = await API.graphql(graphqlOperation(listItems));
        setItems(res.data.listItems.items);
        onAfterAsyncSuccess(res);
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    async function getItemById(id) {
      onBeforeAsync('');

      try {
        const res = await API.graphql(graphqlOperation(getItem, { id }));
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
      getItemsList();
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
