import React from 'react';

type TBaseItem = {
  _id: string,
  name: string,
  count: number,
  __v: number,
};

export type TItem = TBaseItem & {
  group: string,
};

export type TFullItem = TBaseItem & {
  group: TGroup,
};

export type TItemData = {
  item: TFullItem,
  parentGroups: TGroup[],
};

type TBaseGroup = {
  _id: string,
  name: string,
  __v: number,
};

export type TGroup = TBaseGroup & {
  group: string,
};

export type TFullGroup = TBaseGroup & {
  group?: TGroup,
};

export type TGroupData = {
  group: TFullGroup,
  groups: TGroup[],
  items: TItem[],
  parentGroups: TGroup[],
};

export type TAddGroupFormProps = {
  parentGroupId: string,
};

export type TBaseItemFormProps = {
  url: string,
  initialName?: string,
  initialCount?: number,
};

export type TAddItemFormProps = {
  parentGroupId: string,
};

export type TUpdateItemFormProps = {
  itemId: string,
  initialName: string,
  initialCount: number,
};

export type TParentGroupsProps = {
  groups: TGroup[],
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
