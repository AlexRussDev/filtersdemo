import React, { useState } from "react";
import { TextField, FormControl, Select, MenuItem, Grid } from "@mui/material";
import { ICriteria } from "./types";

interface AmountCriteriaProps {
  criterion: any;
  handleCriteriaChange: (key: keyof ICriteria, value: string) => void;
}

export const amountConditions = [
  { value: "more", label: "More" },
  { value: "less", label: "Less" },
  { value: "equals", label: "Equals" },
];

const AmountCriteria: React.FC<AmountCriteriaProps> = ({
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
            {amountConditions.map((condition) => (
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
          type="number"
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

export default AmountCriteria;
