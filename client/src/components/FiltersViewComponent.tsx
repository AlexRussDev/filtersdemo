import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { fetchFilters } from "../api/api";
import { Box, Button, Grid } from "@mui/material";
import { SuccessMessage, WarningMessage } from "./ToastNotification";
import FilterComponent from "./filter/FilterComponent";
import LoadingSpinnerComponent from "./LoadingSpinnerComponent";
import DataTable from "./DataTable";

const FiltersViewComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.filters);
  const loading = useAppSelector((state) => state.filters.loading);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [builtInOpen, setBuiltInOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenBuiltInFilter = () => {
    setBuiltInOpen(true);
  };

  const handleCloseBuiltInFilter = () => {
    setBuiltInOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFilters());
    };
    fetchData();
  }, [dispatch, dialogOpen, builtInOpen]);

  return (
    <>
      <LoadingSpinnerComponent loading={loading} embeded={false} />
      {!loading && (
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenBuiltInFilter}
              >
                Show built-in filter
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
              >
                Display Filter In Modal
              </Button>
            </Grid>
          </Grid>
          <FilterComponent
            useDialog={true}
            open={dialogOpen}
            onClose={handleCloseDialog}
          />

          {builtInOpen && (
            <Box mt={2} width="50%">
              <FilterComponent onClose={handleCloseBuiltInFilter} />
            </Box>
          )}
          <Box mt={2} width="50%">
            <h2>Stored Filters</h2>
            <DataTable
              data={data}
              onEdit={(id: number) => {
                return SuccessMessage(
                  `Selected Filter: ${id} for edit operation (Not implemented, because there wasn\'t any requirement in task).`
                );
              }}
              onDelete={(id: number) => {
                return WarningMessage(
                  `Selected Filter ID: ${id} for delete operation (Not implemented, because there wasn\'t any requirement in task).`
                );
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FiltersViewComponent;
