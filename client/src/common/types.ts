export interface IFilter {
  id?: number;
  name: string;
  criteria?: string;
  selection?: string;
}

export interface IBaseState {
  error: string | null;
  loading: boolean;
}

export interface IFiltersState extends IBaseState {
  data: IFilter[];
}

export interface IFilterAction {
  id: number | null;
  action: "edit" | "delete" | null;
}

export type TFilter = IFilter;
export type TFiltersData = TFilter[];
