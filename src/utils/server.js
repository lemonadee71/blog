import { cookies } from 'next/headers';
import { fetchFromAPI } from './';

export const fetchFromAPIWithCookie = (path, opts = {}) => {
  const sessionCookie = cookies().get('connect.sid');
  return fetchFromAPI(path, {
    ...opts,
    headers: {
      Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      ...opts?.headers,
    },
  });
};
