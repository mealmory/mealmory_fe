export const checkSpecialCharacters = (text: string) => {
  const expText = /[%=*><]/;
  return expText.test(text);
};
