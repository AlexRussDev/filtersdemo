import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  loading: boolean;
  embeded?: boolean;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerProps> = ({
  loading,
  embeded = true,
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
        height: embeded ? "100%" : "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinnerComponent;
