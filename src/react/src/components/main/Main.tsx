import React from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../add-group-form/AddGroupForm';
import { TGroup } from '../../types';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function mainLoader({ params }): TGroup[] | Response {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await fetch('/api/groups/').then((response) => {
    return response.json();
  });
}

function Main() {
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

export default Main;
