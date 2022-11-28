export interface IBoard {
  _id: string;
  title: { title: string; description: string };
  owner: string;
  users: string[];
}
