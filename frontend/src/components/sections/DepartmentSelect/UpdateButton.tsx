import { useUpdateEmployee } from "@/api/updateDepartment";
import { Employee } from "@/app/types/Employee";
import Button from "@mui/material/Button";

type Props = {
  employee: Employee;
  isEnabled: boolean;
  departmentId: number;
};

const UpdateButton = ({ employee, isEnabled, departmentId }: Props) => {
  const { mutate, isPending, isError } = useUpdateEmployee();

  const handleUpdate = () => {
    const updatedEmployee = {
      id: employee.id,
      department: { id: departmentId },
    };
    mutate(updatedEmployee);
  };

  const isDisabled = !isEnabled || isPending || isError;

  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      disabled={isDisabled}
      sx={{ mt: 1 }}
      onClick={handleUpdate}
    >
      Update
    </Button>
  );
};

export default UpdateButton;