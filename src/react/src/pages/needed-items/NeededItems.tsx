import React from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import ParentGroups from '../../components/parent-groups/ParentGroups';
import { TFullItem } from '../../types';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function neededItemsLoader({ params }): TFullItem[] | Response {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await fetch('/api/needed-items/').then((response) => {
    return response.json();
  });
}

function NeededItems() {
  // @ts-ignore
  const items: TFullItem[] = useLoaderData();

  return (
    <>
      <ParentGroups />

      <h1>Needed items</h1>

      {items.map(item => (
        <div key={item._id}>
          <div>Name: {item.name}</div>
          <div>Count needed: {item.neededCount - item.count}</div>
          <div>Group: <Link to={`/group/${item.group._id}`}>{item.group.name}</Link></div>
        </div>
      ))}
    </>
  );
}

export default NeededItems;
