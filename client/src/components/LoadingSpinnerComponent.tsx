import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerProps> = ({
  loading,
}) => {
  if (!loading) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinnerComponent;
