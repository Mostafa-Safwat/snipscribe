import { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import { FormProps } from "../form/types";

export type TableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  entityName: string;
  entityDisplayKey: keyof T;
  entityIdentifierKey: keyof T;
  onRowClick?: (row: T) => void;
  onUpdated?: (updatedRow: T) => void;
  onDeleted?: (deletedRow: T) => void;
  onCreated?: (createdRow: T) => void;
  createFields?: FormProps;
  updateFields?: FormProps;
};
