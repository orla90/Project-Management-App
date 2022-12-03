import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { Dispatch } from 'react';
import {
  deleteColumnFetch,
  getColumnsFetch,
  uppdateOrdersColumns,
} from 'store/actions-creators/board/board-action';
import { getAllUserLoginFetch } from 'store/actions-creators/board/task-actions';
import { ColumnProps } from 'store/interfaces/board';
import { AppDispatch } from 'store/types/types-redux';

export const getAllUserLoginst = async (board: IBoard, dispatch: AppDispatch) => {
  board.users.forEach(async (userID: string) => {
    await dispatch(getAllUserLoginFetch({ id: userID }));
  });
};

export const getColumns = async (
  dispatch: AppDispatch,
  setColumns: Dispatch<Array<ColumnProps> | []>
) => {
  setColumns((await dispatch(getColumnsFetch({}))).payload);
};

const reorderColumns = (id: string, columns: Array<ColumnProps>): Array<ColumnProps> => {
  return columns
    .filter((a: ColumnProps) => {
      return a._id !== id;
    })
    .map((a: ColumnProps, i: number) => {
      return {
        _id: a._id,
        order: i,
      };
    });
};

export const deleteColumn = async (
  lang: 'en' | 'ru',
  dispatch: AppDispatch,
  columns: ColumnProps[],
  columnId: string
) => {
  const reorderedColumns = reorderColumns(columnId, columns);
  if (reorderedColumns.length > 0)
    await dispatch(
      uppdateOrdersColumns({
        guid: 'uppdate_orders_from_delete_column',
        result: reorderedColumns,
        lang: lang,
      })
    );
  await dispatch(
    deleteColumnFetch({ columnId: columnId, lang: lang, guid: 'uppdate_from_delete_column' })
  );
};
