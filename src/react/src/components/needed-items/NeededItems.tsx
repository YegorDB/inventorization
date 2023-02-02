import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import ItemCount from '../item-count/ItemCount';
import { TFullItem, TNeededItemsProps } from '../../types';

const NeededItem: FC<TFullItem> = ({
  name,
  count: initialCount,
  neededCount,
  group,
}) => {
  const [count, setCount] = useState<number>(initialCount || 0);

  return (
    <>
      <div>Name: {name}</div>
      <ItemCount count={count} setCount={setCount} />
      <div>Count needed: {neededCount - count}</div>
      <div>Group: <Link to={`/group/${group._id}`}>{group.name}</Link></div>
    </>
  );
}

const NeededItems: FC<TNeededItemsProps> = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <div key={item._id}>
          <NeededItem {...item} />
        </div>
      ))}
    </>
  );
}

export default NeededItems;
