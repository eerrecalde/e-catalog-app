import React from 'react';
import { useParams } from 'react-router-dom';
import ItemsGrid from '../components/grid/grid';

function Catalog() {
  const { id } = useParams();

  return (
    <div className="catalog">
      <ItemsGrid id={id} />
    </div>
  );
}

export default Catalog;
