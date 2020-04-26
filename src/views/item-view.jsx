import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from '../components/item-details/item-details';

function ItemView() {
  const { id } = useParams();

  return (
    <div className="main-container">
      <div className="container">
        <h3>Item view</h3>
      </div>
      <ItemDetails id={id} />
    </div>
  );
}

export default ItemView;
