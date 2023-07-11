'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export const getFormData = (form) => {
  const data = new FormData(form);
  const o = {};

  for (const key of data.keys()) {
    const value = data.getAll(key);
    o[key] = value.length > 1 ? value : value[0];
  }

  return o;
};

// We need this to trigger GET after redirect
// See https://stackoverflow.com/questions/76395110/next-js-v13-revalidate-not-triggering-after-router-push
export const useRedirect = () => {
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const redirect = (path) => {
    startTransition(() => router.push(path));
    startTransition(() => router.refresh());
  };

  return redirect;
};
