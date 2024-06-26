import { CloseOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

interface Props extends Omit<DialogProps, "open"> {
  title?: string;
  isOpen: boolean;
  isDisabled?: boolean;
  trigger: () => React.ReactElement;
  handleOpen: () => void;
  handleClose: () => void;
  onConfirm: () => void;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, openDialog, closeDialog };
};

const ConfirmDialog = ({
  title = "Are you sure?",
  trigger,
  onConfirm,
  children,
  fullScreen,
  isDisabled = false,
  isOpen,
  handleOpen,
  handleClose,
  ...rest
}: Props) => {
  return (
    <>
      {trigger()}

      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullScreen={fullScreen}
        {...rest}
      >
        <DialogTitle id="dialog-title">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            {title}
            {fullScreen && (
              <IconButton onClick={handleClose}>
                <CloseOutlined />
              </IconButton>
            )}
          </Stack>
        </DialogTitle>

        <DialogContent>{children}</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus disabled={isDisabled}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
