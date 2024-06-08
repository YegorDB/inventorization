type TBaseItem = {
  id: string,
  name: string,
  count: number,
  neededCount: number,
};

export type TItem = TBaseItem & {
  group: string,
};

export type TFullItem = TBaseItem & {
  group: TGroup,
};

type TBaseGroup = {
  id: string,
  name: string,
};

export type TGroup = TBaseGroup & {
  group: string,
};

export type TFullGroup = TBaseGroup & {
  group?: TGroup,
};
