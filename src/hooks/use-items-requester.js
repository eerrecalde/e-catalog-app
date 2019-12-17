import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { listMyCatalogItems } from '../graphql/queries';

const useItemsRequester = (initialValues, callback) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [reloadList, setReloadList] = useState();

  useEffect(() => {
    async function getItemsList() {
      try {
        const data = await API.graphql(graphqlOperation(listMyCatalogItems));
        setLoading(false);
        setItems(data.data.listMyCatalogItems.items);
        console.log('>', data.data.listMyCatalogItems.items);
      } catch (err) {
        setLoading(false);
        setError(err.errors[0].message);
        console.log('ERROR >', err.errors[0].message);
      }
    }

    if (reloadList === true || reloadList === undefined) {
      getItemsList();
      setReloadList(false);
    }
  }, [reloadList, initialValues, callback]);

  return {
    error,
    loading,
    items,
  };
};

export default useItemsRequester;
