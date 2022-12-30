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
  items: string,
};

export type TAddGroupFormProps = {
  parentGroupId: string,
};

export type TAddItemFormProps = {
  parentGroupId: string,
};
