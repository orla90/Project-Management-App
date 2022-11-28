export interface IModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}
