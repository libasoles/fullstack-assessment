import { useDeleteEmployee } from "@/api/deleteEmployee";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Employee } from "@/types/Employee";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

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
      explanation="The employee will not be displayed in the system anymore, so you won't be able to recover it."
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
    />
  );
};

export default DeleteEmployeeButton;
