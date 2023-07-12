'use client';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { fetchFromAPI } from '@/utils';
import { getFormData, useRedirect } from '@/utils/client';
import { AuthContext } from '../context';

const LoginPage = () => {
  const { setError } = useContext(AuthContext);
  const redirect = useRedirect();

  useEffect(() => {
    setError(null);
  }, [setError]);

  const login = async (e) => {
    const data = getFormData(e.currentTarget);

    const res = await fetchFromAPI('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { success, message } = await res.json();
    if (success) {
      setError('');
      redirect('/');
    } else {
      setError(message);
    }
  };

  return (
    <>
      <form
        id="login"
        className="mt-8 flex flex-col gap-6 lg:max-w-lg"
        onSubmit={(e) => {
          login(e);
          e.preventDefault();
        }}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
      </form>

      <div className="mt-6 sm:flex sm:items-center sm:gap-4">
        <button
          type="submit"
          form="login"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        >
          Login
        </button>

        <div>
          <form
            id="login_guest"
            className="hidden"
            onSubmit={(e) => {
              login(e);
              e.preventDefault();
            }}
          >
            <input
              type="hidden"
              name="username"
              id="guest_username"
              value="user"
            />
            <input
              type="hidden"
              name="password"
              id="guest_password"
              value="1234"
            />
          </form>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup" className="text-gray-700 underline">
              Sign up
            </Link>
            <span> or </span>
            <button
              type="submit"
              form="login_guest"
              className="text-gray-700 underline outline-none"
            >
              log in as guest
            </button>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
