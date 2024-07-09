import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IFilter } from "../common/types";

interface DataTableProps {
  data: IFilter[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) {
    return <h4>Table is empty</h4>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(row.id!)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(row.id!)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
