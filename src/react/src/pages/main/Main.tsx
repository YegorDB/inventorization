import React, { useCallback, useState } from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../../components/add-group-form/AddGroupForm';
import Modal from '../../components/modal/Modal';
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

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <h1>Main</h1>

      <h3>Groups</h3>
      {groups.map((group: TGroup) => (
        <Link to={`/group/${group._id}`} key={group._id}>
          <div>{group.name}</div>
        </Link>
      ))}

      <button onClick={openModal} >
        Add group
      </button>

      {modalOpen && (
        <Modal handleClose={closeModal} title="Add group">
          <AddGroupForm parentGroupId="_" />
        </Modal>
      )}

      <div>
        <Link to="/needed-items">Needed items</Link>
      </div>
    </>
  );
}

export default Main;
