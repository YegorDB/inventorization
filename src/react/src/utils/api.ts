export async function request<T>(
  path: string,
  init?: RequestInit,
  callback?:  Function,
): Promise<T> {
  const data = await fetch(path, init).then(res => res.json());
  if (callback) {
    callback(data);
  }
  return data;
}

export async function requestPost<D, T>(
  path: string,
  data: D,
  callback?:  Function,
): Promise<T> {
  return await request(path, {
  	method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  	body: JSON.stringify(data),
  }, callback);
}
