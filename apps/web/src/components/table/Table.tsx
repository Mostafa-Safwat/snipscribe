import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowData,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, useTheme } from "@mui/material";
import { TableProps } from "./types";
import { Edit as EditIcon } from "@mui/icons-material";
import CrudModal from "../modals/CrudModal";

const Table = <T extends MRT_RowData>({
  columns,
  data,
  entityName,
  entityDisplayKey,
  createFields,
  updateFields,
}: TableProps<T>) => {
  const theme = useTheme();

  const tableColumns = useMemo<MRT_ColumnDef<T>[]>(() => columns, [columns]);
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [selectedRow, setSelectedRow] = useState<T>();

  const table = useMaterialReactTable({
    columns: tableColumns,
    data,
    enableRowSelection: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    createDisplayMode: "custom",
    editDisplayMode: "custom",
    positionToolbarAlertBanner: "bottom",
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      },
    },
    muiTableContainerProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiTableHeadProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiTableBodyProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <Button
          variant="contained"
          onClick={() => {
            setMode("create");
            setOpen(true);
          }}
        >
          Create {entityName}
        </Button>
      </Box>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setSelectedRow(row.original);
              setMode("update");
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />

      {createFields && open && mode === "create" && (
        <CrudModal
          title={`Create ${entityName}`}
          open={open}
          setOpen={setOpen}
          formProps={{
            fields: createFields.fields,
            validation: createFields.validation,
            onSubmit: createFields.onSubmit,
            initialValues: {},
          }}
        />
      )}

      {updateFields && open && mode === "update" && selectedRow && (
        <CrudModal
          title={`Update ${entityName} - ${selectedRow[entityDisplayKey]}`}
          open={open}
          setOpen={setOpen}
          formProps={{
            fields: updateFields.fields,
            validation: updateFields.validation,
            onSubmit: updateFields.onSubmit,
            initialValues: selectedRow,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Table;
