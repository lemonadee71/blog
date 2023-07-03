import React from 'react';
import { fetchFromAPIWithCookie } from '../utils/server';

async function hasAuthenticatedUser() {
  const res = await fetchFromAPIWithCookie('/user', {
    cache: process.env.CACHE_MODE,
  });
  return res.json();
}

const ProtectedWrapper = async ({ ifHasUser, ifNoUser }) => {
  const { isAuthenticated } = await hasAuthenticatedUser();

  return <div>{isAuthenticated ? ifHasUser : ifNoUser}</div>;
};

export default ProtectedWrapper;
