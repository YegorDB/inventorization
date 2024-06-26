import React, { useCallback, useState } from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../../components/add-group-form/AddGroupForm';
import Modal from '../../components/modal/Modal';
import { TGroup } from '../../types';
import { checkAuth, mainGroupsRequest } from '../../utils';

// @ts-ignore
export async function mainLoader({ params }): TGroup[] | Response {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await mainGroupsRequest();
}

function Main() {
  // @ts-ignore
  const groups: TGroup[] = useLoaderData();

  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const openAddGroupModal = useCallback(() => setAddGroupModalOpen(true), []);
  const closeAddGroupModal = useCallback(() => setAddGroupModalOpen(false), []);

  return (
    <>
      <h1>Main</h1>

      <h3>Groups</h3>
      {groups.map((group: TGroup) => (
        <Link to={`/group/${group.id}`} key={group.id}>
          <div>{group.name}</div>
        </Link>
      ))}

      <button onClick={openAddGroupModal} >
        Add group
      </button>

      {addGroupModalOpen && (
        <Modal handleClose={closeAddGroupModal} title="Add group">
          <AddGroupForm parentGroupId={0} />
        </Modal>
      )}

      <div>
        <Link to="/needed-items">Needed items</Link>
      </div>
      <div>
        <Link to="/search">Search</Link>
      </div>
    </>
  );
}

export default Main;
