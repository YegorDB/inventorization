import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../add-group-form/AddGroupForm';
import AddItemForm from '../add-item-form/AddItemForm';
import { TItem, TGroup, TGroupData } from '../../types';

// @ts-ignore
export async function groupLoader({ params }): TGroupData {
  return await fetch(`/api/groups/${params.groupId}`).then((response) => {
    return response.json();
  });
}

function Group() {
  // @ts-ignore
  const { group, groups, items} = useLoaderData();

  return (
    <>
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

      <AddGroupForm parentGroupId={group._id} />
      <AddItemForm parentGroupId={group._id} />
    </>
  );
}

export default Group;
