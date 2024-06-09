import { getCookieValue } from './cookie';
import {
  TLoginRequestData,
  TSuccessResponseData,
  TItemResponseData,
  TGroupResponseData,
  TGroupParentsResponseData,
  TMainGroupsResponseData,
  TNeededItemsResponseData,
} from '../types';

export async function request<T>(
  path: string,
  init?: RequestInit,
  callback?: Function,
  errorHandler?: Function,
): Promise<T> {
  const data = await (
    fetch(path, init)
    .then(res => res.json())
    .catch((err: Error) => {
      console.error(`${path} error\n`, err);
      if (errorHandler) {
        errorHandler(err);
      }
    })
  );

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
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookieValue('csrftoken')
    },
  	body: JSON.stringify(data),
  }, callback);
}

export async function checkAuth() {
  const data = await request<TSuccessResponseData>(
    '/api/1.0/auth/check/',
  );

  return data.success;
}

export async function loginRequest(
  data: TLoginRequestData
): Promise<TSuccessResponseData> {
  return await postRequest<TLoginRequestData, TSuccessResponseData>(
    '/api/1.0/auth/login/',
    data,
  );
}

export async function itemRequest(
  itemId: number,
): Promise<TItemResponseData> {
  return await request<TItemResponseData>(
    `/api/1.0/items/${itemId}`,
  );
}

export async function groupRequest(
  groupId: number,
): Promise<TGroupResponseData> {
  return await request<TGroupResponseData>(
    `/api/1.0/groups/${groupId}`,
  );
}

export async function groupParentsRequest(
  groupId: number,
): Promise<TGroupParentsResponseData> {
  return await request<TGroupParentsResponseData>(
    `/api/1.0/groups/${groupId}/parents`,
  );
}

export async function mainGroupsRequest(): Promise<TMainGroupsResponseData> {
  return await request<TMainGroupsResponseData>(
    '/api/1.0/groups/root/',
  );
}

export async function neededItemsRequest(): Promise<TNeededItemsResponseData> {
  return await request<TNeededItemsResponseData>(
    '/api/1.0/items/needed/',
  );
}
