import React, { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  TextFieldProps,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ICriteria } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { AppSettings } from "../../AppSettings";
import "dayjs/locale/et";

interface DateCriteriaProps {
  criterion: any;
  handleCriteriaChange: (key: keyof ICriteria, value: any) => void;
}

const dateConditions = [
  { value: "before", label: "Before" },
  { value: "after", label: "After" },
  { value: "on", label: "On" },
];

const DateCriteria: React.FC<DateCriteriaProps> = ({
  criterion,
  handleCriteriaChange,
}) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      setValue(newValue);
      handleCriteriaChange("value", newValue ? newValue.toISOString() : null);
    },
    [handleCriteriaChange]
  );

  const handleConditionChange = useCallback(
    (event: SelectChangeEvent) => {
      handleCriteriaChange("condition", event.target.value as string);
    },
    [handleCriteriaChange]
  );

  useEffect(() => {
    setValue(criterion.value ? dayjs(criterion.value) : null);
  }, [criterion.value]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <Select
            value={criterion.condition}
            onChange={handleConditionChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Condition
            </MenuItem>
            {dateConditions.map((condition) => (
              <MenuItem key={condition.value} value={condition.value}>
                {condition.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={AppSettings.CLocale}
        >
          <DatePicker
            value={value}
            onChange={handleDateChange}
            slots={{
              textField: (params: TextFieldProps) => (
                <TextField {...params} fullWidth />
              ),
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default DateCriteria;
