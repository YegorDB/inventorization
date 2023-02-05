import React, { FC } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

import { TLoginRequestData } from '../../types';
import { checkAuth, loginRequest } from '../../utils';

// @ts-ignore
export async function authLoginLoader() {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
}

// @ts-ignore
export async function authLoginAction({ request }): boolean | Response {
  const formData = await request.formData();

  const data = await loginRequest(
    Object.fromEntries(formData.entries()) as TLoginRequestData,
  );

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
