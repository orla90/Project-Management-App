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
import { io } from 'socket.io-client';
import Overlay from 'components/UI/overlay/Overlay';
import { Navigate } from 'react-router-dom';
import { ColumnProps } from 'store/interfaces/board';
import { boardSlice } from 'store/slices/board-slice';
import Column from './column/Column';
import InviteUser from './invite-user/InviteUser';
import { i18ObjInviteUSer } from 'texts/board/invite-user';
import { key } from 'texts/footer/footer-text';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { handleDragEnd } from './board-page-functions/dragEnd-functions';
import { getAllUserLoginst, getColumns } from './board-page-functions/fetch-functions';
import { getAllBoardTasksFetch } from 'store/actions-creators/board/task-actions';
import { dataTasks } from 'store/actions-creators/board/sort-data-all-tasks-fn';
import { ToastContainer } from 'react-toastify';

const BoardPage = () => {
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [inviteUser, setInviteUser] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();
  const { resetBordAndColumns } = boardSlice.actions;
  const { overlay, board, tasks } = useAppSelector((state) => state.boardSlice);
  const { setNewOrdersTasks } = boardSlice.actions;
  const [columns, setColumns] = useState<Array<ColumnProps> | []>([]);

  useEffect(() => {
    console.log('USEEFFECT BOARD_PAGE');
    if (!document.body.classList.contains('_lock')) {
      document.body.classList.add('_lock');
    }
    if (board) {
      dispatch(getAllBoardTasksFetch({}));
      getColumns(dispatch, setColumns);
      getAllUserLoginst(board, dispatch);
    }

    const socket = io('https://react-final-project-production.up.railway.app/');
    socket.on('columns', (message) => {
      console.log('WEBSOCKET COLUMNS', message);
      if (message.guid !== 'uppdate_orders_from_delete_column') {
        getColumns(dispatch, setColumns);
      }
    });
    socket.on('tasks', (message) => {
      console.log('WEBSOCKET TASKS', message);
      dispatch(getAllBoardTasksFetch({}));
    });

    return () => {
      if (document.body.classList.contains('_lock')) {
        document.body.classList.remove('_lock');
      }
      socket.close();
      dispatch(resetBordAndColumns());
    };
  }, [dispatch, resetBordAndColumns, board]);

  const dragEnd = (result: DropResult) => {
    handleDragEnd(
      result,
      dispatch,
      tasks as dataTasks[],
      setNewOrdersTasks,
      columns as ColumnProps,
      setColumns
    );
  };

  return (
    <>
      {overlay && <Overlay />}
      {board === null && <Navigate to={`../${ROUTES.BOARDS_LIST}`} />}

      <article className="board">
        <div className="board__container">
          {board !== null && (
            <div className="board__description">
              <div className="board__title-wrapper">
                {i18Obj[lang].board}: <h2 className="board__title">{board.title.title}</h2>
              </div>
              <p className="board__subtitle">{board.title.description}</p>
            </div>
          )}
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
          <DragDropContext onDragEnd={dragEnd}>
            <div className="board__list-body">
              <Droppable droppableId="Columns" type="Columns" direction={'horizontal'}>
                {(provided) => (
                  <div className="board__list" ref={provided.innerRef} {...provided.droppableProps}>
                    {columns &&
                      columns.map((column: ColumnProps) => {
                        return (
                          <Draggable
                            key={column._id}
                            draggableId={column._id!}
                            index={column.order!}
                          >
                            {(provided) => (
                              <Column key={column._id} props={{ ...column, provided, columns }} />
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <ToastContainer />
          </DragDropContext>
        </div>
      </article>
    </>
  );
};

export default BoardPage;
