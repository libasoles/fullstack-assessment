import { useDeleteEmployee } from "@/api/useDeleteEmployee";
import ConfirmDialog, { useConfirmDialog } from "@/components/ConfirmDialog";
import { Employee } from "@/types/Employee";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";

type Props = {
  employee: Employee;
};

const DeleteEmployeeButton = ({ employee }: Props) => {
  const { isOpen, openDialog, closeDialog } = useConfirmDialog();

  const { mutate } = useDeleteEmployee();

  const handleConfirm = () => {
    mutate(employee.id);
  };

  return (
    <ConfirmDialog
      trigger={() => (
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon fontSize="small" />}
          onClick={openDialog}
        >
          Delete
        </Button>
      )}
      isOpen={isOpen}
      handleOpen={openDialog}
      handleClose={closeDialog}
      onConfirm={handleConfirm}
    >
      <DialogContentText id="dialog-description">
        {
          "The employee will not be displayed in the system anymore, so you won't be able to recover it."
        }
      </DialogContentText>
    </ConfirmDialog>
  );
};

export default DeleteEmployeeButton;
