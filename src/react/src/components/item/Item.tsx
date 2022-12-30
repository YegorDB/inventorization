import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { TFullItem } from '../../types';

// @ts-ignore
export async function itemLoader({ params }): TFullItem {
  return await fetch(`/api/items/${params.itemId}`).then((response) => {
    return response.json();
  });
}

function Item() {
  // @ts-ignore
  const item: TFullItem = useLoaderData();

  return (
    <>
      <Link to={`/group/${item.group._id}`}>
        <div>{item.group.name}</div>
      </Link>

      <h1>Item { item.name }</h1>

      <div>count { item.count }</div>
    </>
  );
}

export default Item;
