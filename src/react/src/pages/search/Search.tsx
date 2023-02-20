import React from 'react';
import { redirect } from 'react-router-dom';

import ParentGroups from '../../components/parent-groups/ParentGroups';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function searchLoader({ params }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return;
}

function SearchPage() {
  return (
    <>
      <ParentGroups />

      <h1>Search</h1>
    </>
  );
}

export default SearchPage;
