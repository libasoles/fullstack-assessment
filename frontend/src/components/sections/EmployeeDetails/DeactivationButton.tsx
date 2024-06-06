import { useUpdateEmployee } from "@/api/useUpdateEmployee";
import { Employee } from "@/types/Employee";
import Button from "@mui/material/Button";

type Props = {
  employee: { id: Employee["id"] };
  isActive: boolean;
};

const DeactivationButton = ({ employee, isActive }: Props) => {
  const { mutate, isPending, isError } = useUpdateEmployee();

  const handleUpdate = () => {
    const updatedEmployee = { id: employee.id, isActive: !isActive };
    mutate(updatedEmployee);
  };

  const isButtonEnabled = !isPending;

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
