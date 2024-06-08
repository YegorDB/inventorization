import React, { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import ItemCount from '../item-count/ItemCount';
import { TItem, TFullItem, TNeededItemsProps } from '../../types';
import { postRequest } from '../../utils';

const NeededItem: FC<TFullItem> = ({
  id,
  name,
  count: initialCount,
  neededCount,
  group,
}) => {
  const [count, setCount] = useState<number>(initialCount || 0);

  const callback = useCallback(
    (newCount: number) => {
      setCount(newCount);

      const path = `/api/items/update/${id}/`;
      const requestData = {
        count: newCount,
      };
      postRequest(path, requestData, (responseData: TItem) => {
        console.log('responseData', responseData);
      });
    },
    [setCount, id]
  );

  return (
    <>
      <div><Link to={`/item/${id}`}>{name}</Link></div>
      <div>Count: <ItemCount count={count} callback={callback} /></div>
      <div>Nedded count: {neededCount}</div>
      <div>Group: <Link to={`/group/${group.id}`}>{group.name}</Link></div>
    </>
  );
}

const NeededItems: FC<TNeededItemsProps> = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <div key={item.id}>
          <NeededItem {...item} />
        </div>
      ))}
    </>
  );
}

export default NeededItems;
