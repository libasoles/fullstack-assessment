import { useDeleteEmployee } from "@/api/useDeleteEmployee";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Employee } from "@/types/Employee";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";

type Props = {
  employee: Employee;
};

const DeleteEmployeeButton = ({ employee }: Props) => {
  const { mutate } = useDeleteEmployee();

  const handleConfirm = () => {
    mutate(employee.id);
  };

  return (
    <ConfirmDialog
      trigger={({ onClick: handleClick }) => (
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon fontSize="small" />}
          onClick={handleClick}
        >
          Delete
        </Button>
      )}
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
