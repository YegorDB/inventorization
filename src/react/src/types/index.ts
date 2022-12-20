export type TItem = {
  _id: string,
  name: string,
  group: string,
  count: number,
  __v: number,
}

export type TGroup = {
  _id: string,
  name: string,
  __v: number,
}

export type TGroupData = {
  group: TGroup,
  groups: TGroup[],
  items: string,
}

export type TAddGroupFormProps = {
  parentGroupId: string,
}

export type TAddItemFormProps = {
  parentGroupId: string,
}
