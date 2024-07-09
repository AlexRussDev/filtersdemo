import React, { useState } from "react";
import { TextField, FormControl, Select, MenuItem, Grid } from "@mui/material";
import { ICriteria } from "./types";

interface TitleCriteriaProps {
  criterion: any;
  handleCriteriaChange: (key: keyof ICriteria, value: string) => void;
}

const titleConditions = [
  { value: "equals", label: "Equals" },
  { value: "starts_with", label: "Starts with" },
];

const TitleCriteria: React.FC<TitleCriteriaProps> = ({
  criterion,
  handleCriteriaChange,
}) => {
  const [value, setValue] = useState<string>(criterion.value);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <Select
            value={criterion.condition}
            onChange={(e) => handleCriteriaChange("condition", e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Condition
            </MenuItem>
            {titleConditions.map((condition) => (
              <MenuItem key={condition.value} value={condition.value}>
                {condition.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onBlur={() => handleCriteriaChange("value", value)}
        />
      </Grid>
    </Grid>
  );
};

export default TitleCriteria;
