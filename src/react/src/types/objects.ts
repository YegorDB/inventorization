type TBaseItem = {
  id: number,
  name: string,
  count: number,
  needed_count: number,
};

export type TItem = TBaseItem & {
  group_id: number,
};

export type TFullItem = TBaseItem & {
  group: TGroup,
};

type TBaseGroup = {
  id: number,
  name: string,
};

export type TGroup = TBaseGroup & {
  group_id: number,
};

export type TFullGroup = TBaseGroup & {
  group?: TGroup,
};

export type TCreateUpdateGroup = {
  name?: string,
  group_id?: number,
}
