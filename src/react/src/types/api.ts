import type { TItem, TFullItem, TGroup, TFullGroup } from './objects';

export type TLoginRequestData = {
  username: string,
  password: string,
};

export type TSuccessResponseData = {
  success: boolean,
};

export type TItemResponseData = {
  item: TFullItem,
  parentGroups: TGroup[],
};

export type TGroupResponseData = {
  group: TFullGroup,
  groups: TGroup[],
  items: TItem[],
  parentGroups: TGroup[],
};

export type TMainGroupsResponseData = TGroup[];

export type TNeededItemsResponseData = TFullItem[];
