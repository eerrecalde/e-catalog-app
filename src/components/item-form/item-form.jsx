import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ItemFormView from './item-form.view';
import { useMutateData } from '../../hooks/use-mutate-data';
import { useFetchData } from '../../hooks/use-fetch-data';
import Alert from '../alert/alert';

function ItemForm({ id }) {
  const [alert, setAlert] = useState({ show: false });
  const [itemDataState] = useFetchData(
    {
      queryId: 'getItem',
      variables: id ? { id } : null,
    },
    null,
  );

  const {
    isLoading: loadingRequest,
    isError: requestIsError,
    errorMsg: requestErrorMsg,
    data: item,
  } = itemDataState;
  const [mutateDataState = {}, mutateData] = useMutateData('createItem');

  const {
    isLoading: loadingMutate,
    isError: mutateIsError,
    errorMsg: mutateErrorMsg = null,
    data: itemCreated,
  } = mutateDataState;

  function onSubmitAction(obj = {}) {
    if (!obj.item || !obj.type) {
      return;
    }

    mutateData(obj.item);
  }

  useEffect(() => {
    let alertConfig = { show: false };
    if (requestIsError) {
      alertConfig = { show: true, msg: requestErrorMsg, variant: 'danger', closeInSeconds: 0 };
    }
    if (mutateIsError) {
      alertConfig = { show: true, msg: mutateErrorMsg, variant: 'danger', closeInSeconds: 0 };
    }
    if (!mutateErrorMsg && itemCreated) {
      alertConfig = {
        show: true,
        msg: 'Item created successfully!',
        variant: 'success',
        closeInSeconds: 3,
      };
    }
    setAlert(alertConfig);
  }, [requestErrorMsg, requestIsError, mutateErrorMsg, mutateIsError, itemCreated]);

  return (
    <div className="container">
      <pre>{JSON.stringify(itemDataState, null, '\t')}</pre>
      <pre>{JSON.stringify(mutateDataState, null, '\t')}</pre>
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
      {loadingRequest || loadingMutate ? <p>{loadingRequest || loadingMutate}</p> : ''}
      {requestErrorMsg || mutateErrorMsg ? <p>{requestErrorMsg || mutateErrorMsg}</p> : ''}
      <ItemFormView item={item || {}} onSubmit={onSubmitAction} />
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
