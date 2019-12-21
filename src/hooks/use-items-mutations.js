import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createMyCatalogItems,
  updateMyCatalogItems,
  deleteMyCatalogItems,
} from '../graphql/mutations';

const useItemsRequester = (initialValues, callback) => {
  const [loading, setLoading] = useState(true);
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

    async function setNewItem() {
      initialValues.setItemOperation('getItems');
      const res = await API.graphql(
        graphqlOperation(createMyCatalogItems, { input: initialValues.item }),
      );

      console.log('Success', res);
      callback('recipe added');
    }

    async function deleteItem(id) {
      initialValues.setItemOperation('getItems');
      const res = await API.graphql(graphqlOperation(deleteMyCatalogItems, { input: { id } }));

      const tmpId = res.data.deleteItem.id;
      console.log('Success', res.data.deleteMyCatalogItems, tmpId);
      callback('Item removed: ', tmpId);
    }

    async function updateItem() {
      initialValues.setItemOperation('getItems');
      const res = await API.graphql(
        graphqlOperation(updateMyCatalogItems, { input: initialValues.item }),
      );

      console.log('Success', res);
      callback('Item updated!');
    }

    if (!initialValues.itemOperation) {
      return;
    }

    if (!initialValues.item) {
      return;
    }

    if (
      initialValues.item.title !== '' &&
      !initialValues.item.id &&
      initialValues.itemOperation === 'create'
    ) {
      console.log('creatingItem', initialValues.item);
      asyncRequest(setNewItem);
      return;
    }

    if (
      initialValues.item.title !== '' &&
      initialValues.item.id &&
      initialValues.itemOperation === 'update'
    ) {
      console.log('updating item', initialValues.item);
      asyncRequest(updateItem);
    }

    if (initialValues.item.id && initialValues.itemOperation === 'delete') {
      console.log('removing item');
      asyncRequest(() => deleteItem(initialValues.itemOperation.id));
    }
  }, [initialValues, callback]);

  return {
    error,
    loading,
  };
};

export default useItemsRequester;
