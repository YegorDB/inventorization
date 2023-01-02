export async function checkAuth() {
  const data = await fetch('/api/auth/check/').then(res => res.json());

  return data.success;
}
