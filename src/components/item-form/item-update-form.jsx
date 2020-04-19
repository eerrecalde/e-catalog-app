import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery, queryCache, useMutation } from 'react-query';
import { getItem } from '../../graphql/queries';
import ItemFormView from './item-form.view';
// import { useMutateData } from '../../hooks/use-mutate-data';
import { updateItem } from '../../graphql/mutations';
import Alert from '../alert/alert';

function ItemForm({ id }) {
  const [alert, setAlert] = useState({ show: false });

  const { statusRequest, data: item, errorRequest, isFetching } = useQuery(
    'item-fetch',
    async () => {
      const { data } = await API.graphql({
        query: getItem,
        variables: { id },
        authMode: 'API_KEY',
      });
      return data.getItem || null;
    },
  );

  const [onSubmitAction] = useMutation(
    (obj) => API.graphql(graphqlOperation(updateItem, { input: obj.item })),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (obj) => {
        console.log('>>>> item', obj.item);
        const previousItemValue = queryCache.getQueryData('item-fetch');
        const previousValue = queryCache.getQueryData('items-fetch');
        console.log('>>>> previousValue', previousValue);

        queryCache.setQueryData('items-fetch', (old) => [
          ...old,
          {
            ...obj.item,
            id: 'tmp01',
          },
        ]);
        queryCache.setQueryData('item-fetch', () => ({
          ...obj.item,
          id: 'tmp01',
          title: 'TESTTTTTTT!!!',
        }));
        console.log('>>>> worked01??', queryCache.getQueryData('item-fetch'));
        console.log('>>>> worked02??', queryCache.getQueryData('items-fetch'));

        return { previousValue, previousItemValue };
      },
      // On failure, roll back to the previous value
      onError: (err, variables, obj) => {
        console.log('Err', err);
        console.log('Err obj', obj);
        // error.errors[0].message.toString()
        const {
          errors: [{ message }],
        } = err;
        console.log('message', message);
        setAlert({ show: true, msg: message || 'Error', variant: 'danger', closeInSeconds: 0 });
        queryCache.setQueryData('item-fetch', obj.previousItemValue);
        return queryCache.setQueryData('items-fetch', obj.previousValue);
      },
      onSuccess: () => {
        console.log('Worked');
        // setText('');
        setAlert({
          show: true,
          msg: 'Item created successfully!',
          variant: 'success',
          closeInSeconds: 3,
        });
      },
      // After success or failure, refetch the item-fetch query
      onSettled: () => {
        console.log('mutation finished! updating in 5 secs..');
        setTimeout(() => {
          queryCache.refetchQueries('item-fetch');
          queryCache.refetchQueries('items-fetch');
          console.log('mutation updated');
        }, 5000);
      },
    },
  );

  return (
    <div className="container">
      {statusRequest === 'loading' ? 'Loading...' : ''}
      {statusRequest === 'error' ? errorRequest.message : ''}
      <pre>{JSON.stringify(item, null, '\t')}</pre>
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
      <ItemFormView item={item || {}} onSubmit={onSubmitAction} />
      <div>{isFetching ? 'Updating in background...' : ' '}</div>
    </div>
  );
}

ItemForm.propTypes = {
  id: PropTypes.string,
};

ItemForm.defaultProps = {
  id: null,
};

export default ItemForm;
