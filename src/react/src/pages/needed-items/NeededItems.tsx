import React from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import NeededItems from '../../components/needed-items/NeededItems';
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

function NeededItemsPage() {
  // @ts-ignore
  const items: TFullItem[] = useLoaderData();

  return (
    <>
      <ParentGroups />

      <h1>Needed items</h1>

      <NeededItems items={items} />
    </>
  );
}

export default NeededItemsPage;
