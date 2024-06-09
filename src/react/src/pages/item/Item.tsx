import React, { useCallback, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';

import Modal from '../../components/modal/Modal';
import ParentGroups from '../../components/parent-groups/ParentGroups';
import UpdateItemForm from '../../components/update-item-form/UpdateItemForm';
import { checkAuth, itemRequest, groupParentsRequest } from '../../utils';

// @ts-ignore
export async function itemLoader({ params }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  const itemData = await itemRequest(params.itemId);
  const parentGroupsData = await groupParentsRequest(itemData.item.group.id);

  return [ itemData, parentGroupsData ];
}

function Item() {
  // @ts-ignore
  const [ itemData, parentGroupsData ] = useLoaderData();
  const { item } = itemData
  const { groups: parentGroups } = parentGroupsData

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <ParentGroups groups={ parentGroups } />

      <h1>Item { item.name }</h1>

      <div>count { item.count }</div>
      <div>needed count { item.needed_count }</div>

      <button onClick={openModal} >
        Edit item
      </button>

      {modalOpen && (
        <Modal handleClose={closeModal} title="Edit item">
          <UpdateItemForm
            itemId={item._id}
            initialName={item.name}
            initialCount={item.count}
            initialNeededCount={item.needed_count}
          />
        </Modal>
      )}
    </>
  );
}

export default Item;
