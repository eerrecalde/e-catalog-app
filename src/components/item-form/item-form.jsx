import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemFormView from './item-form.view';
import useItemsRequester from '../../hooks/use-items-requester';
import useItemsMutations from '../../hooks/use-items-mutations';
import Alert from '../alert/alert';

function ItemForm({ id }) {
  const [itemOperation, setItemOperation] = useState('getItemById');
  const [formItem, setFormItem] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '' });
  const { errorRequest, loadingRequest, item } = useItemsRequester(
    {
      item: { id },
      itemOperation,
      setItemOperation,
    },
    msg => {
      console.log('done', msg);
    },
    [],
  );

  const { errorMutate, loadingMutate } = useItemsMutations({
    item: formItem,
    itemOperation,
    setItemOperation,
  }, msg => {
    console.log('done', msg, errorMutate, loadingMutate);

    /* Alert related stuff */
    setAlert({ show: true, msg });
  }, [formItem, itemOperation]);

  function onSubmitAction(obj = {}) {
    console.log('onSubmitAction', obj);
    if (id) {
      console.log('update');
    } else {
      console.log('create');
    }

    if (!obj.item || !obj.type) {
      return;
    }


    setFormItem(obj.item);
    console.log('onSubmitAction 2', formItem);
    setItemOperation(obj.type);
    console.log('onSubmitAction 3', itemOperation);
  }

  console.log('re-execute item-form', errorMutate);

  /* Alert related stuff */
  if (errorRequest) {
    setAlert({
      show: true, variant: 'danger', closeInSeconds: 0, msg: errorRequest,
    });
  }

  /* Alert related stuff */
  if (errorMutate) {
    setAlert({
      show: true, variant: 'danger', closeInSeconds: 0, msg: errorMutate,
    });
  }

  /* Alert related stuff */
  function onAlertCloseAction() {
    setAlert({ show: false });
  }

  return (
    <div className="container">
      <Alert
        show={alert.show}
        text={alert.msg}
        variant={alert.variant || undefined}
        closeInSeconds={alert.closeInSeconds}
        dismissible={alert.dismissible || undefined}
        onAlertClose={onAlertCloseAction}
      />
      { loadingRequest || loadingMutate ? (<p>{loadingRequest || loadingMutate}</p>) : '' }
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
