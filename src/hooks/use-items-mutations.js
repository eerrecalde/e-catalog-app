import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem, updateItem, deleteItem } from '../graphql/mutations';

const useItemsRequester = (initialValues, callback) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    function onBeforeAsync(operation) {
      initialValues.setItemOperation(operation || '');
      setLoading(true);
    }

    function onAfterAsyncSuccess(res, msg) {
      setLoading(false);
      console.table('Success >', res);
      callback(msg);
    }

    function onAfterAsyncError(err) {
      setError(err.errors[0].message);
      setLoading(false);
      console.error('ERROR >', err.errors[0].message);
    }

    async function createItemAction() {
      onBeforeAsync('getItems');

      try {
        const res = await API.graphql(graphqlOperation(createItem, { input: initialValues.item }));
        onAfterAsyncSuccess(res, 'recipe added');
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    async function deleteItemAction(id) {
      onBeforeAsync('getItems');

      try {
        const res = await API.graphql(graphqlOperation(deleteItem, { input: { id } }));
        const tmpId = res.data.deleteItem.id;
        onAfterAsyncSuccess(res, `Item removed: ${tmpId}`);
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    async function updateItemAction() {
      onBeforeAsync('getItems');

      try {
        const res = await API.graphql(graphqlOperation(updateItem, { input: initialValues.item }));
        onAfterAsyncSuccess(res, 'Item updated!');
      } catch (err) {
        onAfterAsyncError(err);
      }
    }

    console.log('itemsMutations initialValues', initialValues);

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
      createItemAction();
      return;
    }

    if (
      initialValues.item.title !== '' &&
      initialValues.item.id &&
      initialValues.itemOperation === 'update'
    ) {
      console.log('updating item', initialValues.item);
      updateItemAction();
    }

    if (initialValues.item.id && initialValues.itemOperation === 'delete') {
      console.log('removing item');
      deleteItemAction(initialValues.itemOperation.id);
    }
  }, [initialValues, callback]);

  return {
    error,
    loading,
  };
};

export default useItemsRequester;
