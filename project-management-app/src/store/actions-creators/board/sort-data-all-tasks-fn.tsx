export type dataTasks = {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: Array<string>;
};
export type dataTask = {
  _id: string;
  order: number;
  columnId: string;
};

export const sortArr = (arr: Array<dataTasks>): { [x: string]: Array<dataTasks> } => {
  const result: { [x: string]: Array<dataTasks> } = {};
  arr.forEach((element) => {
    const colID: keyof typeof result = element.columnId;
    if (result[colID]) {
      result[colID] = [...result[colID], element];
    } else {
      result[colID] = [element];
    }
  });
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      result[key] = result[key].sort((a, b) => a.order - b.order);
    }
  }
  return result;
};
