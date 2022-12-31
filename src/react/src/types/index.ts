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
  parentGroups: TGroup[],
  item: TFullItem,
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
};

export type TAddGroupFormProps = {
  parentGroupId: string,
};

export type TAddItemFormProps = {
  parentGroupId: string,
};

export type TParentGroupsProps = {
  groups: TGroup[],
};
