export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.0]+\.[A-Z]{2,}$/i.test(email);
