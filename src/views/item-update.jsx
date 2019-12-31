import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';

import ItemForm from '../components/item-form/item-form';

function ItemCrud() {
  const { id } = useParams();

  return (
    <div className="item-create">
      <div className="container">
        <h3>
          Edit your item
        </h3>
      </div>
      <ItemForm id={id} />
    </div>
  );
}

export default withAuthenticator(ItemCrud, { includeGreetings: true });
// export default ItemCrud;