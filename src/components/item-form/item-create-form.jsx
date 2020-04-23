import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { queryCache, useMutation } from 'react-query';
import ItemFormView from './item-form.view';
// import { useMutateData } from '../../hooks/use-mutate-data';
import { createItem } from '../../graphql/mutations';
import Alert from '../alert/alert';

function ItemForm() {
  const [alert, setAlert] = useState({ show: false });

  // const [mutateDataState = {}, mutateData] = useMutateData(id ? 'updateItem' : 'createItem');

  // const {
  //   isError: mutateIsError,
  //   errorMsg: mutateErrorMsg = null,
  //   data: itemCreated,
  // } = mutateDataState;

  const [onSubmitAction] = useMutation(
    (obj) => API.graphql(graphqlOperation(createItem, { input: obj.item })),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (obj) => {
        console.log('>>>> item', obj.item);
        const previousValue = queryCache.getQueryData('items-fetch');
        console.log('>>>> previousValue', previousValue);

        queryCache.setQueryData('items-fetch', (old) => [
          ...old,
          {
            ...obj.item,
            id: 'tmp01',
          },
        ]);
        console.log('>>>> worked02??', queryCache.getQueryData('items-fetch'));

        return previousValue;
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
        // queryCache.refetchQueries('items-fetch');
      },
    },
  );

  return (
    <div className="container">
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
      <ItemFormView item={{}} onSubmit={onSubmitAction} />
    </div>
  );
}

export default ItemForm;
