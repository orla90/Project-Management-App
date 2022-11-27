import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Modal from 'components/UI/modal/Modal';
import { ROUTES } from 'constants/routes';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import i18Obj from 'texts/board/board-page';
import './board-page.scss';
import BoardForm from './board-form/BoardForm';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { getColumnsFetch } from 'store/actions-creators/board/board-action';
import { io } from 'socket.io-client';
import Overlay from 'components/UI/overlay/Overlay';
import { Navigate } from 'react-router-dom';
import { ColumnProps } from 'store/interfaces/board';
import { boardSlice } from 'store/slices/board-slice';
import Column from './column/Column';
import InviteUser from './invite-user/InviteUser';
import { i18ObjInviteUSer } from 'texts/board/invite-user';
import { key } from 'texts/footer/footer-text';
import {
  getAllBoardTasksFetch,
  getAllUserLoginFetch,
} from 'store/actions-creators/board/task-actions';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dataTask, dataTasks } from 'store/actions-creators/board/sort-data-all-tasks-fn';
import { MovingTheTask } from 'store/actions-creators/board/dnd-actions';

const BoardPage = () => {
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [inviteUser, setInviteUser] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();
  const { resetBordAndColumns } = boardSlice.actions;
  const { overlay, board, tasks } = useAppSelector((state) => state.boardSlice);
  const { setNewOrdersTasks } = boardSlice.actions;
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    console.log('USEEFFECT BOARD-PAGE');
    const getAllUserLoginst = async () => {
      (board! as IBoard).users.forEach(async (userID: string) => {
        await dispatch(getAllUserLoginFetch({ id: userID }));
      });
    };
    const getColumnsAndTasks = async () => {
      await dispatch(getAllBoardTasksFetch({}));
      const data = await dispatch(getColumnsFetch({}));
      setColumns(data.payload);
    };

    if (board) {
      getColumnsAndTasks();
      getAllUserLoginst();
    }

    const socket = io('https://react-final-project-production.up.railway.app/');
    socket.on('columns', () => {
      dispatch(getColumnsFetch({}));
    });
    socket.on('tasks', () => {
      dispatch(getAllBoardTasksFetch({}));
    });
    return () => {
      document.body.style.overflow = 'visible';
      socket.close();
      dispatch(resetBordAndColumns());
    };
  }, [dispatch, resetBordAndColumns, board]);

  const dragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    function createResultArr(arr: Array<dataTasks>): Array<dataTask> {
      return arr.map((task: dataTasks, i: number): dataTask => {
        return {
          _id: task._id,
          order: i,
          columnId: task.columnId,
        };
      });
    }
    function copyTaskaArr(arr: Array<dataTasks>, key: string): Array<dataTasks> {
      return JSON.parse(JSON.stringify(arr[key as keyof typeof arr]));
    }
    function setOrderNewTasks(arr: Array<dataTasks>): Array<dataTasks> {
      return arr.map((a: dataTasks, i: number) => {
        return { ...a, order: i };
      });
    }
    const sourceColumnID = source.droppableId;
    const sourceOrder = source.index;

    const destinationColumnID = destination?.droppableId;
    const destinationOrder = destination!.index;

    const sourceTasksColumn = copyTaskaArr(tasks as Array<dataTasks>, sourceColumnID);
    const temp = sourceTasksColumn[sourceOrder];
    sourceTasksColumn.splice(sourceOrder, 1);
    if (sourceColumnID === destinationColumnID) {
      sourceTasksColumn.splice(destinationOrder, 0, temp);
      const result = createResultArr(sourceTasksColumn);
      const newTasks = setOrderNewTasks(sourceTasksColumn);
      const resultNewTasks = { ...tasks, [sourceColumnID]: newTasks };
      dispatch(setNewOrdersTasks(resultNewTasks));
      dispatch(MovingTheTask(result));
    } else {
      temp.columnId = destinationColumnID;
      if (tasks[destinationColumnID as keyof typeof tasks]) {
        const destinationTasksColumn = copyTaskaArr(tasks as Array<dataTasks>, destinationColumnID);
        destinationTasksColumn.splice(destinationOrder, 0, temp);
        const result = [
          ...createResultArr(sourceTasksColumn),
          ...createResultArr(destinationTasksColumn),
        ];
        const sourceColum = setOrderNewTasks(sourceTasksColumn);
        const destinationColumn = setOrderNewTasks(destinationTasksColumn);
        const resultNewTasks = {
          ...tasks,
          [sourceColumnID]: sourceColum,
          [destinationColumnID]: destinationColumn,
        };
        dispatch(setNewOrdersTasks(resultNewTasks));
        dispatch(MovingTheTask(result));
      } else {
        const newColumnTasks = temp;
        newColumnTasks.order = 0;
        const result = [
          ...createResultArr(sourceTasksColumn),
          ...createResultArr([newColumnTasks]),
        ];
        const resultNewTasks = {
          ...tasks,
          [sourceColumnID]: setOrderNewTasks(sourceTasksColumn),
          [destinationColumnID]: [newColumnTasks],
        };
        dispatch(setNewOrdersTasks(resultNewTasks));
        dispatch(MovingTheTask(result));
      }
    }
  };

  return (
    <>
      {board === null && <Navigate to={`../${ROUTES.BOARDS_LIST}`} />}
      {overlay && <Overlay />}
      <DragDropContext onDragEnd={dragEnd}>
        <article className="board">
          <div className="board__container">
            <div className="board__panel">
              <CustomLink className="board__btn main-page-btn" to={`../${ROUTES.BOARDS_LIST}`}>
                {i18Obj[lang].back}
              </CustomLink>
              <Modal
                open={addColumnModal}
                onClose={() => setAddColumnModal(false)}
                title={i18Obj[lang].addColumn}
              >
                {
                  <BoardForm
                    onClose={() => setAddColumnModal(false)}
                    description={false}
                    target={'addColumn'}
                  />
                }
              </Modal>
              <CustomButton
                className="board__add-column-btn"
                onClick={() => {
                  setAddColumnModal(true);
                }}
              >
                {i18Obj[lang].column}
              </CustomButton>

              <Modal
                open={inviteUser}
                onClose={() => setInviteUser(false)}
                title={i18ObjInviteUSer[language as key].title}
              >
                {<InviteUser />}
              </Modal>
              <CustomButton
                className="board__add-column-btn"
                onClick={() => {
                  setInviteUser(true);
                }}
              >
                {i18ObjInviteUSer[language as key].generalButton}
              </CustomButton>
            </div>
            <div className="board-list__body">
              <div className="board__list">
                {columns &&
                  columns.map((column: ColumnProps) => {
                    return <Column key={column._id} props={column} />;
                  })}
              </div>
            </div>
          </div>
        </article>
      </DragDropContext>
    </>
  );
};

export default BoardPage;
