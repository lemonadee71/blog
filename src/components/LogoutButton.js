'use client';
import React from 'react';
import { fetchFromAPI } from '@/utils';
import { useRedirect } from '@/utils/client';

const LogoutButton = (props) => {
  const redirect = useRedirect();

  async function logout() {
    const res = await fetchFromAPI('/logout', { method: 'POST' });
    const { success } = await res.json();

    if (success) redirect('/');
  }

  return (
    <button
      onClick={() => logout()}
      className="inline-block rounded-md border border-blue-600 px-4 py-2 text-sm text-white font-bold transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-600"
      {...props}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
