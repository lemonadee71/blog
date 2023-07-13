import React from 'react';
import { fetchFromAPIWithCookie } from '@/utils/server';

async function hasAuthenticatedUser() {
  const res = await fetchFromAPIWithCookie('/user', {
    cache: process.env.CACHE_MODE,
  });
  return res.json();
}

const ProtectedWrapper = async ({ ifHasUser, ifNoUser, ...props }) => {
  const { user } = await hasAuthenticatedUser();

  return <div {...props}>{user ? ifHasUser : ifNoUser}</div>;
};

export default ProtectedWrapper;
