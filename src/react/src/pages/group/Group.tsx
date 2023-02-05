import React, { useCallback, useState } from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';

import AddGroupForm from '../../components/add-group-form/AddGroupForm';
import AddItemForm from '../../components/add-item-form/AddItemForm';
import Modal from '../../components/modal/Modal';
import ParentGroups from '../../components/parent-groups/ParentGroups';
import { TItem, TGroup } from '../../types';
import { checkAuth, groupRequest } from '../../utils';

// @ts-ignore
export async function groupLoader({ params }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await groupRequest(params.groupId);
}

function Group() {
  // @ts-ignore
  const { group, groups, items, parentGroups } = useLoaderData();

  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const openAddGroupModal = useCallback(() => setAddGroupModalOpen(true), []);
  const closeAddGroupModal = useCallback(() => setAddGroupModalOpen(false), []);

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const openAddItemModal = useCallback(() => setAddItemModalOpen(true), []);
  const closeAddItemModal = useCallback(() => setAddItemModalOpen(false), []);

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

      <button onClick={openAddGroupModal} >
        Add group
      </button>

      <button onClick={openAddItemModal} >
        Add item
      </button>

      {addGroupModalOpen && (
        <Modal handleClose={closeAddGroupModal} title="Add group">
          <AddGroupForm parentGroupId={group._id} />
        </Modal>
      )}

      {addItemModalOpen && (
        <Modal handleClose={closeAddItemModal} title="Add item">
          <AddItemForm parentGroupId={group._id} />
        </Modal>
      )}
    </>
  );
}

export default Group;
