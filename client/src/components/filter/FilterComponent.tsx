import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { SuccessMessage, WarningMessage } from "../ToastNotification";
import { ICriteria, IFilterComponentProps, TCriteria } from "./types";
import { saveFilter } from "../../api/api";
import { IFilter } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

import LoadingSpinnerComponent from "../LoadingSpinnerComponent";
import ResizableDialogComponent from "../ResizableDialogComponent";
import AmountCriteria from "./AmountCriteria";
import TitleCriteria from "./TitleCriteria";
import DateCriteria from "./DateCriteria";

interface IFilterData extends Omit<IFilter, "criteria"> {
  criteria: ICriteria[];
}

const RootBox = styled(Box)({
  padding: "16px",
});

const CriteriaBox = styled(Box)({
  marginBottom: "16px",
});

const CriteriaHeader = styled(Typography)({
  marginBottom: "8px",
});

const AddButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "8px",
});

const SelectionBox = styled(Box)({
  marginBottom: "16px",
});

const ScrollableContent = styled(Box)({
  maxHeight: "220px",
  overflowY: "auto",
  paddingRight: "16px",
});

const FilterComponent: React.FC<IFilterComponentProps> = ({
  useDialog = false,
  open = true,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.filter.loading);

  const defCrit: TCriteria = { field: "amount", condition: "", value: "" };
  const [filterData, setFilterData] = useState<IFilterData>({
    name: "",
    criteria: [defCrit],
    selection: "",
  });
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const lastInputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const [nameError, setNameError] = useState<string | null>(null);

  const handleAddRow = () => {
    setFilterData((prev) => ({
      ...prev,
      criteria: [...prev.criteria, defCrit],
    }));
  };

  const handleRemoveRow = (index: number) => {
    if (index === 0) {
      WarningMessage("Filter should have at least one criteria");
      return;
    }
    setFilterData((prev) => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== index),
    }));
  };

  const handleCriteriaChange = useCallback(
    (index: number, key: keyof ICriteria, value: any) => {
      setFilterData((prev) => {
        const newCriteria = [...prev.criteria];
        newCriteria[index][key] = value;
        return {
          ...prev,
          criteria: newCriteria,
        };
      });
    },
    []
  );

  const handleSave = async () => {
    if (!filterData.name.trim()) {
      setNameError("Filter name is required");
      return;
    }

    await dispatch(
      saveFilter({
        ...filterData,
        criteria: JSON.stringify(filterData.criteria),
      })
    );
    setFilterData({
      name: "",
      criteria: [defCrit],
      selection: "",
    });
    SuccessMessage("Filter saved successfully!");

    if (onClose) onClose();
  };

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop =
        scrollableContentRef.current.scrollHeight;
    }
  }, [filterData.criteria]);

  const renderCriteriaComponent = useCallback(
    (criterion: ICriteria, index: number) => {
      const handleChange = (key: keyof ICriteria, value: any) =>
        handleCriteriaChange(index, key, value);
      switch (criterion.field) {
        case "amount":
          return (
            <AmountCriteria
              criterion={criterion}
              handleCriteriaChange={handleChange}
            />
          );
        case "title":
          return (
            <TitleCriteria
              criterion={criterion}
              handleCriteriaChange={handleChange}
            />
          );
        case "date":
          return (
            <DateCriteria
              criterion={criterion}
              handleCriteriaChange={handleChange}
            />
          );
        default:
          return null;
      }
    },
    [handleCriteriaChange]
  );

  const content = (
    <>
      <LoadingSpinnerComponent loading={loading} />
      {!loading && (
        <RootBox>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Filter name"
              value={filterData.name}
              onChange={(e) => {
                setFilterData((prev) => ({ ...prev, name: e.target.value }));
                if (nameError) setNameError(null);
              }}
              required
              error={!!nameError}
              helperText={nameError}
            />
          </Box>
          <CriteriaBox>
            <CriteriaHeader variant="h6">Criteria</CriteriaHeader>
            <ScrollableContent ref={scrollableContentRef}>
              {filterData.criteria.length === 0 && "No Filter Data"}
              {filterData.criteria.map((criterion, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  style={{ marginBottom: "16px" }}
                >
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Select
                        value={criterion.field}
                        onChange={(e) =>
                          handleCriteriaChange(index, "field", e.target.value)
                        }
                        displayEmpty
                        inputRef={
                          index === filterData.criteria.length - 1
                            ? lastInputRef
                            : null
                        }
                      >
                        <MenuItem value="" disabled>
                          Field
                        </MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    {renderCriteriaComponent(criterion, index)}
                  </Grid>
                  <Grid item xs={3}>
                    {index > 0 && (
                      <IconButton onClick={() => handleRemoveRow(index)}>
                        <Remove />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
            </ScrollableContent>
            <AddButtonBox>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRow}
                startIcon={<Add />}
              >
                Add Row
              </Button>
            </AddButtonBox>
          </CriteriaBox>
          <SelectionBox>
            <Typography variant="h6">Selection</Typography>
            <RadioGroup
              row
              value={filterData.selection}
              onChange={(e) =>
                setFilterData((prev) => ({
                  ...prev,
                  selection: e.target.value,
                }))
              }
            >
              <FormControlLabel
                value="select1"
                control={<Radio />}
                label="Select 1"
              />
              <FormControlLabel
                value="select2"
                control={<Radio />}
                label="Select 2"
              />
              <FormControlLabel
                value="select3"
                control={<Radio />}
                label="Select 3"
              />
            </RadioGroup>
          </SelectionBox>
        </RootBox>
      )}
    </>
  );

  if (useDialog) {
    return (
      <ResizableDialogComponent
        open={open}
        onClose={onClose}
        title="Filter"
        onSave={handleSave}
      >
        {content}
      </ResizableDialogComponent>
    );
  }

  return (
    <>
      <Box
        alignItems="center"
        sx={{ border: "1px solid #C0C0C0" }}
        padding="30px"
      >
        {content}
        {!loading && (
          <Box width="100%">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" onClick={onClose}>
                  Close
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FilterComponent;
