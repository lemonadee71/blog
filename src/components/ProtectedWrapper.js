'use client';
import React from 'react';
import { fetchFromAPI } from '../app/utils';

// we need this to be inside a client component to work
// my guess is we don't have the cookies if it is inside the server
async function hasAuthenticatedUser() {
  const res = await fetchFromAPI('/user', { cache: 'no-store' });
  return res.json();
}

const ProtectedWrapper = async ({ ifHasUser, ifNoUser }) => {
  const { isAuthenticated } = await hasAuthenticatedUser();

  return <div>{isAuthenticated ? ifHasUser : ifNoUser}</div>;
};

export default ProtectedWrapper;
