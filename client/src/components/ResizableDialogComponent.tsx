import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResizableWrapperComponent from "./ResizableWrapperComponent";
import { Box } from "@mui/system";

interface ResizableDialogProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
}

const ResizableDialogComponent: React.FC<ResizableDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperComponent={ResizableWrapperComponent as any}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResizableDialogComponent;
