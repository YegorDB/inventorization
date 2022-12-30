import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../add-group-form/AddGroupForm';
import { TGroup } from '../../types';

// @ts-ignore
export async function mainLoader({ params }): TGroup[] {
  return await fetch('/api/groups/').then((response) => {
    return response.json();
  });
}

function Index() {
  // @ts-ignore
  const groups: TGroup[] = useLoaderData();

  return (
    <>
      <h1>Main</h1>

      <h3>Groups</h3>
      {groups.map((group: TGroup) => (
        <Link to={`/group/${group._id}`} key={group._id}>
          <div>{group.name}</div>
        </Link>
      ))}

      <h3>Add group</h3>
      <AddGroupForm parentGroupId="_" />
    </>
  );
}

export default Index;
