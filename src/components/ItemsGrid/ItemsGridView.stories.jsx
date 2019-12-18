import React from 'react';
import { storiesOf } from '@storybook/react';

import ItemsGridView from './ItemsGridView';

const item = {
  id: '1',
  title: 'Test Item',
  price: 23.50,
};

const defaultItemsGrid = [
  { ...item, id: '1', title: 'Item 1' },
  { ...item, id: '2', title: 'Item 2' },
  { ...item, id: '3', title: 'Item 3' },
  { ...item, id: '4', title: 'Item 4' },
];

storiesOf('ItemsGridView', module)
  .addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => <ItemsGridView items={defaultItemsGrid} />);
