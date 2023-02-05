import {
  TLoginRequestData,
  TSuccessResponseData,
  TItemResponseData,
  TGroupResponseData,
  TMainGroupsResponseData,
  TNeededItemsResponseData,
} from '../types';

export async function request<T>(
  path: string,
  init?: RequestInit,
  callback?: Function,
): Promise<T> {
  const data = await fetch(path, init).then(res => res.json());
  if (callback) {
    callback(data);
  }
  return data;
}

export async function postRequest<D, T>(
  path: string,
  data: D,
  callback?: Function,
): Promise<T> {
  return await request<T>(path, {
  	method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  	body: JSON.stringify(data),
  }, callback);
}

export async function checkAuth() {
  const data = await request<TSuccessResponseData>(
    '/api/auth/check/',
  );

  return data.success;
}

export async function loginRequest(
  data: TLoginRequestData
): Promise<TSuccessResponseData> {
  return await postRequest<TLoginRequestData, TSuccessResponseData>(
    '/api/auth/login/',
    data,
  );
}

export async function itemRequest(
  itemId: string,
): Promise<TItemResponseData> {
  return await request<TItemResponseData>(
    `/api/items/${itemId}`,
  );
}

export async function groupRequest(
  groupId: string,
): Promise<TGroupResponseData> {
  return await request<TGroupResponseData>(
    `/api/groups/${groupId}`,
  );
}

export async function mainGroupsRequest(): Promise<TMainGroupsResponseData> {
  return await request<TMainGroupsResponseData>(
    '/api/groups/',
  );
}

export async function neededItemsRequest(): Promise<TNeededItemsResponseData> {
  return await request<TNeededItemsResponseData>(
    '/api/needed-items/',
  );
}
