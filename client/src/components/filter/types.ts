export interface ICriteria {
  field: string;
  condition: string;
  value: string;
}

export interface IFilterComponentProps {
  useDialog?: boolean;
  filterId?: number;
  open?: boolean;
  onClose?: () => void;
}

export type TCriteria = ICriteria;
