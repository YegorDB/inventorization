import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { TItem } from '../../types';

// @ts-ignore
export async function itemLoader({ params }): TItem {
  return await fetch(`/api/items/${params.itemId}`).then((response) => {
    return response.json();
  });
}

function Item() {
  // @ts-ignore
  const item: TItem = useLoaderData();

  return (
    <>
      <h1>Item { item.name }</h1>
      <div>count { item.count }</div>
    </>
  );
}

export default Item;
