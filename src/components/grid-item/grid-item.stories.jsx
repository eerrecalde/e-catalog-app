import React from 'react';
import { storiesOf } from '@storybook/react';
import GridItem from './grid-item';

const i = {
  id: '1',
  title: 'Test Item',
  price: 23.50,
};

// export const aaa = 1;

storiesOf('GridItem', module)
  .add('default', () => <GridItem id={i.id} title={i.title} price={i.price} />);
