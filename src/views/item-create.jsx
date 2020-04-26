import React from 'react';
// import { withAuthenticator } from 'aws-amplify-react';
import ItemForm from '../components/item-form/item-create-form';

function ItemCrud() {
  return (
    <div className="main-container item-create">
      <ItemForm />
    </div>
  );
}

// export default withAuthenticator(ItemCrud, { includeGreetings: true });
export default ItemCrud;
