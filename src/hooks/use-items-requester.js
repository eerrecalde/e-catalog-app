import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { getMyCatalogItems, listMyCatalogItems } from '../graphql/queries';

const useItemsRequester = initialValues => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function asyncRequest(fun) {
      try {
        setLoading(true);
        fun();
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
    }

    async function getItemsList() {
      initialValues.setItemOperation('');
      const data = await API.graphql(graphqlOperation(listMyCatalogItems));
      setItems(data.data.listMyCatalogItems.items);
      console.log('>', data.data.listMyCatalogItems.items);
    }

    async function getItemById(id) {
      initialValues.setItemOperation('');
      const data = await API.graphql(graphqlOperation(getMyCatalogItems, { id }));
      setItems(data.data.getMyCatalogItems);
      console.log('>', data.data.getMyCatalogItems);
    }

    if (!initialValues.itemOperation) {
      return;
    }

    if (initialValues.itemOperation === 'getItems') {
      console.log('gettingItems');
      asyncRequest(getItemsList);
      return;
    }

    if (initialValues.itemOperation === 'getItemById' && initialValues.item.id) {
      console.log('gettingItem');
      asyncRequest(() => getItemById(initialValues.item.id));
    }
  }, [initialValues]);

  return {
    error,
    loading,
    items,
  };
};

export default useItemsRequester;
