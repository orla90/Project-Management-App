import { Language } from 'pages/welcome-page/types/types';
import { Dispatch } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { uppdateOrdersColumns } from 'store/actions-creators/board/board-action';
import { MovingTheTask } from 'store/actions-creators/board/dnd-actions';
import { dataTasks, dataTask } from 'store/actions-creators/board/sort-data-all-tasks-fn';
import { ColumnProps } from 'store/interfaces/board';
import { AppDispatch } from 'store/types/types-redux';

export const createResultArr = (arr: Array<dataTasks>): Array<dataTask> => {
  return arr.map((task: dataTasks, i: number): dataTask => {
    return {
      _id: task._id,
      order: i,
      columnId: task.columnId,
    };
  });
};

export const copyArr = (arr: Array<dataTasks>, key: string): Array<dataTasks> => {
  return JSON.parse(JSON.stringify(arr[key as keyof typeof arr]));
};

export const setOrderNewTasks = (arr: Array<dataTasks>): Array<dataTasks> => {
  return arr.map((task: dataTasks, i: number) => {
    return { ...task, order: i };
  });
};

export const handleDragEnd = (
  result: DropResult,
  dispatch: AppDispatch,
  tasks: Array<dataTasks>,
  setNewOrdersTasks: (payload: { [x: string]: dataTasks[] }) => {
    payload: {
      [x: string]: dataTasks[];
    };
    type: 'board/setNewOrdersTasks';
  },
  columns: ColumnProps,
  setColumns: Dispatch<Array<ColumnProps> | []>
) => {
  const { destination, source, type } = result;
  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  const sourceColumnID = source.droppableId;
  const sourceOrder = source.index;
  const destinationColumnID = destination?.droppableId;
  const destinationOrder = destination!.index;
  if (type === 'Tasks') {
    reorderedTasks(
      tasks,
      sourceColumnID,
      sourceOrder,
      destinationColumnID,
      destinationOrder,
      dispatch,
      setNewOrdersTasks
    );
  } else if (type === 'Columns') {
    reorderedColumns(columns, setColumns, sourceOrder, destinationOrder, dispatch);
  }
};

export const reorderedTasks = (
  tasks: Array<dataTasks>,
  sourceID: string,
  sourceOrder: number,
  destinationID: string,
  destinationOrder: number,
  dispatch: AppDispatch,
  setNewOrdersTasks: (payload: { [x: string]: dataTasks[] }) => {
    payload: {
      [x: string]: dataTasks[];
    };
    type: 'board/setNewOrdersTasks';
  }
) => {
  const sourceTasksColumn = copyArr(tasks, sourceID);
  const temp = sourceTasksColumn[sourceOrder];
  sourceTasksColumn.splice(sourceOrder, 1);
  if (sourceID === destinationID) {
    sourceTasksColumn.splice(destinationOrder, 0, temp);
    const result = createResultArr(sourceTasksColumn);
    const newTasks = setOrderNewTasks(sourceTasksColumn);
    const resultNewTasks: { [x: number]: dataTasks[] } = {
      ...tasks,
      [sourceID]: newTasks,
    };
    dispatch(setNewOrdersTasks(resultNewTasks));
    dispatch(MovingTheTask(result));
  } else {
    temp.columnId = destinationID;
    if (tasks[destinationID as keyof typeof tasks]) {
      const destinationTasksColumn = copyArr(tasks as Array<dataTasks>, destinationID);
      destinationTasksColumn.splice(destinationOrder, 0, temp);
      const result = [
        ...createResultArr(sourceTasksColumn),
        ...createResultArr(destinationTasksColumn),
      ];
      const sourceColum = setOrderNewTasks(sourceTasksColumn);
      const destinationColumn = setOrderNewTasks(destinationTasksColumn);
      const resultNewTasks: { [x: number]: dataTasks[] } = {
        ...tasks,
        [sourceID]: sourceColum,
        [destinationID]: destinationColumn,
      };
      dispatch(setNewOrdersTasks(resultNewTasks));
      dispatch(MovingTheTask(result));
    } else {
      const newColumnTasks = temp;
      newColumnTasks.order = 0;
      const result = [...createResultArr(sourceTasksColumn), ...createResultArr([newColumnTasks])];
      const resultNewTasks: { [x: number]: dataTasks[] } = {
        ...tasks,
        [sourceID]: setOrderNewTasks(sourceTasksColumn),
        [destinationID]: [newColumnTasks],
      };
      dispatch(setNewOrdersTasks(resultNewTasks));
      dispatch(MovingTheTask(result));
    }
  }
};

export const reorderedColumns = (
  columns: ColumnProps,
  setColumns: Dispatch<Array<ColumnProps> | []>,
  sourceOrder: number,
  destinationOrder: number,
  dispatch: AppDispatch
) => {
  const columnsArr = JSON.parse(JSON.stringify(columns));
  const temp = columnsArr[sourceOrder];
  columnsArr.splice(sourceOrder, 1);
  columnsArr.splice(destinationOrder, 0, temp);
  setColumns(columnsArr);
  const result = columnsArr.map((a: ColumnProps, i: number) => {
    return {
      _id: a._id,
      order: i,
    };
  });
  dispatch(uppdateOrdersColumns({ result: result, guid: 'UPDATE_FROM_DND' }));
};
