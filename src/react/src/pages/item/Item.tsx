import React, { useCallback, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';

import Modal from '../../components/modal/Modal';
import ParentGroups from '../../components/parent-groups/ParentGroups';
import UpdateItemForm from '../../components/update-item-form/UpdateItemForm';
import { TItemData } from '../../types';
import { checkAuth } from '../../utils';

// @ts-ignore
export async function itemLoader({ params }): TItemData | Response {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return await fetch(`/api/items/${params.itemId}`).then((response) => {
    return response.json();
  });
}

function Item() {
  // @ts-ignore
  const {item, parentGroups} = useLoaderData();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <ParentGroups groups={ parentGroups } />

      <h1>Item { item.name }</h1>

      <div>count { item.count }</div>
      <div>needed count { item.neededCount }</div>

      <button onClick={openModal} >
        Edit item
      </button>

      {modalOpen && (
        <Modal handleClose={closeModal} title="Edit item">
          <UpdateItemForm
            itemId={item._id}
            initialName={item.name}
            initialCount={item.count}
            initialNeededCount={item.neededCount}
          />
        </Modal>
      )}
    </>
  );
}

export default Item;
