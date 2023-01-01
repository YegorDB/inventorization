import React from 'react';
import { useLoaderData } from 'react-router-dom';

import ParentGroups from '../parent-groups/ParentGroups';
import { TItemData } from '../../types';

// @ts-ignore
export async function itemLoader({ params }): TItemData {
  return await fetch(`/api/items/${params.itemId}`).then((response) => {
    return response.json();
  });
}

function Item() {
  // @ts-ignore
  const {item, parentGroups} = useLoaderData();

  return (
    <>
      <ParentGroups groups={ parentGroups } />

      <h1>Item { item.name }</h1>

      <div>count { item.count }</div>
    </>
  );
}

export default Item;
