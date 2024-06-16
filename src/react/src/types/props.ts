import React, { ChangeEventHandler } from 'react';

import { TFullItem, TFullGroup, TGroup } from './objects';

export type TAddGroupFormProps = {
  parentGroupId: number,
};

export type TBaseItemFormProps = {
  itemId?: number,
  parentGroupId?: number,
  initialName?: string,
  initialCount?: number,
  initialNeededCount?: number,
};

export type TAddItemFormProps = {
  parentGroupId: number,
};

export type TUpdateItemFormProps = {
  itemId: number,
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
  callback: Function;
};

export type TSearchTypeItemProps = {
  labelText: string;
  value: string;
  activeValue: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
};

export type TItemSearchResultProps = {
  item: TFullItem,
}

export type TGroupSearchResultProps = {
  group: TFullGroup,
}
