import React from 'react';
import ItemFormView from './item-form.view';

const item = undefined;

function ItemForm() {
  return (
    <div className="container">
      <ItemFormView item={item} />
    </div>
  );
}

export default ItemForm;
