import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { getMyCatalogItems, listMyCatalogItems } from '../graphql/queries';
import {
  createMyCatalogItems,
  updateMyCatalogItems,
  deleteMyCatalogItems,
} from '../graphql/mutations';

const useItemsRequester = (initialValues, callback) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // function asyncOperation(fun) {
    //   try {
    //     setLoading(true);
    //     fun()
    //   } catch (err) {
    //     setError(err.errors[0].message);
    //     console.log('ERROR >', err.errors[0].message);
    //   }
    //   setLoading(false);
    // }

    async function getItemsList() {
      try {
        initialValues.setItemOperation('');
        const data = await API.graphql(graphqlOperation(listMyCatalogItems));
        setItems(data.data.listMyCatalogItems.items);
        console.log('>', data.data.listMyCatalogItems.items);
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
    }

    async function getItemById(id) {
      try {
        initialValues.setItemOperation('');
        const data = await API.graphql(graphqlOperation(getMyCatalogItems, { id }));
        setItems(data.data.getMyCatalogItems);
        console.log('>', data.data.getMyCatalogItems);
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
    }

    async function setNewItem() {
      try {
        initialValues.setItemOperation('getItems');
        const res = await API.graphql(
          graphqlOperation(createMyCatalogItems, { input: initialValues.item }),
        );

        console.log('Success', res);
        callback('recipe added');
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
    }

    async function deleteItem(id) {
      try {
        initialValues.setItemOperation('getItems');
        const res = await API.graphql(graphqlOperation(deleteMyCatalogItems, { input: { id } }));

        const tmpId = res.data.deleteItem.id;
        console.log('Success', res.data.deleteMyCatalogItems, tmpId);
        callback('Item removed: ', tmpId);
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
    }

    async function updateItem() {
      try {
        initialValues.setItemOperation('getItems');
        const res = await API.graphql(
          graphqlOperation(updateMyCatalogItems, { input: initialValues.item }),
        );

        console.log('Success', res);
        callback('Item updated!');
      } catch (err) {
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
      setLoading(false);
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
      setNewItem();
      return;
    }

    if (
      initialValues.item.title !== '' &&
      initialValues.item.id &&
      initialValues.itemOperation === 'update'
    ) {
      console.log('updating item', initialValues.item);
      updateItem();
    }

    if (initialValues.item.id && initialValues.itemOperation === 'delete') {
      console.log('removing item');
      deleteItem(initialValues.itemOperation.id);
    }
  }, [initialValues, callback]);

  return {
    error,
    loading,
    items,
  };
};

export default useItemsRequester;
