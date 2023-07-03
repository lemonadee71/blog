export const getFormData = (form) => {
  const o = {};
  for (const [key, value] of new FormData(form)) o[key] = value;
  return o;
};
