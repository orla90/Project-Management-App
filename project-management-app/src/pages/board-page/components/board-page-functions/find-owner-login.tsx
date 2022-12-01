export const findUserLogin = (userID: string, obj: { [x: string]: string }): string => {
  const newArr = Object.entries(obj);
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i][1] === userID) return newArr[i][0];
  }
  return '';
};
