import { CloseOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

type TriggerProps = {
  onClick: () => void;
};

interface Props extends Omit<DialogProps, "open"> {
  title?: string;
  trigger: (props: TriggerProps) => React.ReactElement;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  title,
  trigger,
  onConfirm,
  children,
  fullScreen,
  ...rest
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {trigger({ onClick: handleOpen })}
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
            {title ? title : "Are you sure?"}
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
          <Button
            onClick={() => {
              handleClose();
              onConfirm();
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
