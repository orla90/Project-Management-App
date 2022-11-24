export interface ColumnTitleConfirmedProps {
  title: string;
  setDeleteColumnModal: (flag: boolean) => void;
  setTitleEditMode: (flag: boolean) => void;
}

export interface ColumnTitleEditProps {
  order: number;
  columnId: string;
  setTitleEditMode: (flag: boolean) => void;
}
