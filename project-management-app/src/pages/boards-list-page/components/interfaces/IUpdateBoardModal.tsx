import { IBoard } from './IBoard';

export interface IUpdateBoardModalProps {
  board: IBoard;
  open: boolean;
  onClose: () => void;
}
