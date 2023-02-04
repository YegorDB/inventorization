import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import ItemCount from '../item-count/ItemCount';
import { TFullItem, TNeededItemsProps } from '../../types';

const NeededItem: FC<TFullItem> = ({
  _id,
  name,
  count: initialCount,
  neededCount,
  group,
}) => {
  const [count, setCount] = useState<number>(initialCount || 0);

  return (
    <>
      <div><Link to={`/item/${_id}`}>{name}</Link></div>
      <div>Count: <ItemCount count={count} setCount={setCount} /></div>
      <div>Nedded count: {neededCount}</div>
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
