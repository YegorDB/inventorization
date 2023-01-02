import React from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../add-group-form/AddGroupForm';
import AddItemForm from '../add-item-form/AddItemForm';
import ParentGroups from '../parent-groups/ParentGroups';
import { TItem, TGroup, TGroupData } from '../../types';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function groupLoader({ params }): TGroupData | Response {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await fetch(`/api/groups/${params.groupId}`).then((response) => {
    return response.json();
  });
}

function Group() {
  // @ts-ignore
  const { group, groups, items, parentGroups } = useLoaderData();

  return (
    <>
      <ParentGroups groups={ parentGroups } />

      <h1>Group { group.name }</h1>

      <h3>Groups</h3>
      {groups.length > 0 ? groups.map((group: TGroup) => (
        <Link to={`/group/${group._id}`} key={group._id}>
          <div>{group.name}</div>
        </Link>
      )) : <div>Empty</div>}

      <h3>Items</h3>
      {items.length > 0 ? items.map((item: TItem) => (
        <Link to={`/item/${item._id}`} key={item._id}>
          <div>{item.name}</div>
        </Link>
      )) : <div>Empty</div>}

      <h3>Add group</h3>
      <AddGroupForm parentGroupId={group._id} />

      <h3>Add item</h3>
      <AddItemForm parentGroupId={group._id} />
    </>
  );
}

export default Group;
