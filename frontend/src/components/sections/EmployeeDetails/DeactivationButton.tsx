import { useUpdateEmployee } from "@/api/useUpdateEmployee";
import { Employee } from "@/types/Employee";
import Button from "@mui/material/Button";

type Props = {
  employee: { id: Employee["id"] };
  isActive: boolean;
};

const DeactivationButton = ({ employee, isActive }: Props) => {
  const { mutate, isPending } = useUpdateEmployee();

  const handleUpdate = () => {
    const updatedEmployee = { id: employee.id, isActive: !isActive };
    mutate(updatedEmployee);
  };

  const isButtonEnabled = !isPending;

  // TODO: handle error scenario, maybe show a snackbar/toast message

  return (
    <Button
      size="small"
      variant="outlined"
      color={!isActive ? "secondary" : "error"}
      disabled={!isButtonEnabled}
      onClick={handleUpdate}
    >
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
};

export default DeactivationButton;
