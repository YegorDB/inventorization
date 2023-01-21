import React, { FC } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

import { checkAuth } from '../../utils';

// @ts-ignore
export async function authLoginLoader(): null | Response {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
}

// @ts-ignore
export async function authLoginAction({ request }): bool | Response {
  const formData = await request.formData();

  const data = await fetch('/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData.entries()))
  })
  .then(response => {
    return response.json();
  });

  if (data.success) {
    return redirect('/');
  }

  return true;
}

const AuthLogin: FC = () => {
  const isWrongInput = useActionData();

  return (
    <>
      <h1>Login</h1>

      {isWrongInput && (
        <div>Wrong username or password</div>
      )}

      <Form method="post" >
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}

export default AuthLogin;
