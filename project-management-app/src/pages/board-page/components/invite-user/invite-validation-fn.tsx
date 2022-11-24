export const validationId = (str: string) => {
  return str.length > 23
    ? true
    : JSON.stringify({ en: 'at least 24 characters', ru: 'Не менее 24 символов' });
};
