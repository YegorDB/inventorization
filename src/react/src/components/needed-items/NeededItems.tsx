import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { TFullItem, TNeededItemsProps } from '../../types';

const NeededItem: FC<TFullItem> = ({
  name,
  count,
  neededCount,
  group,
}) => {
  return (
    <>
      <div>Name: {name}</div>
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
