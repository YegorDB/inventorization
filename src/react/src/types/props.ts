import React from 'react';

import { TFullItem, TGroup } from './objects';

export type TAddGroupFormProps = {
  parentGroupId: string,
};

export type TBaseItemFormProps = {
  url: string,
  initialName?: string,
  initialCount?: number,
  initialNeededCount?: number,
};

export type TAddItemFormProps = {
  parentGroupId: string,
};

export type TUpdateItemFormProps = {
  itemId: string,
  initialName: string,
  initialCount: number,
  initialNeededCount: number,
};

export type TParentGroupsProps = {
  groups?: TGroup[],
};

export type TModalProps = {
  handleClose: Function,
  children: React.ReactNode,
  title?: string,
}

export type TModalHeaderProps = {
  closeHandler: React.MouseEventHandler,
  title?: string,
}

export type TModalOverlayProps = {
  closeHandler: React.MouseEventHandler,
}

export type TNeededItemsProps = {
  items: TFullItem[],
}

export type TItemCountProps = {
  count: number;
  setCount: Function;
};
