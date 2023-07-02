export const fetchFromAPI = (path, opts = {}) =>
  fetch(process.env.NEXT_PUBLIC_API_URL + path, {
    ...opts,
    // Using no-cors will not give the response body
    // See https://stackoverflow.com/questions/36840396/fetch-gives-an-empty-response-body
    // mode: 'no-cors',
    // We need this to send and accept cookies
    credentials: 'include',
  });

export const getFormData = (form) => {
  const o = {};
  for (const [key, value] of new FormData(form)) o[key] = value;
  return o;
};
