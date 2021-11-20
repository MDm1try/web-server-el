export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.0]+\.[A-Z]{2,}$/i.test(email);

export const isCadastralNumber = (cadNum) =>
  /^[0-9]{10}:[0-9]{2}:[0-9]{3}:[0-9]{4}$/i.test(cadNum);
