"use client";

import { useFetchEmployee } from "@/api/useFetchEmployee";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import Loading from "@/components/Loading";
import NoContent from "@/components/NoContent";
import DepartmentForm from "@/components/sections/DepartmentSelect/DepartmentForm";
import DeactivationButton from "@/components/sections/EmployeeDetails/DeactivationButton";
import { InfoRow } from "@/components/sections/EmployeeDetails/InfoRow";
import { Employee } from "@/types/Employee";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  employeeId: Employee["id"];
};

const EmployeeDetails = ({ employeeId: id }: Props) => {
  const { data: employee, isLoading, isError } = useFetchEmployee({ id });

  if (isLoading) return <Loading />;

  if (isError || !employee)
    return (
      <NoContent
        variant="error"
        message="We couldn't retrieve the employee data. Make sure you have the correct link."
      />
    );

  const { firstName, phone, address, daysSinceHire, isActive, name, hireDate } =
    employee;

  return (
    <Stack
      direction={{ lg: "row" }}
      justifyContent="space-between"
      data-testid="employee-details-section"
    >
      <Stack direction="row" spacing={4}>
        <EmployeeAvatar alt={firstName} isDeactivated={!isActive} />
        <Stack>
          <Typography variant="h5" component="div" gutterBottom>
            {name()}
          </Typography>

          <InfoRow label="Telephone" value={phone} />
          <InfoRow label="Address" value={address} />

          <Box mt={4}>
            <DepartmentForm employee={employee} />
          </Box>
        </Stack>
      </Stack>

      <Stack spacing={4} sx={{ m: { xs: 8, sm: 0 } }} minWidth={100}>
        <Box>
          <Typography color="text.secondary">Hire date</Typography>
          <Typography variant="body2">{hireDate()} </Typography>
          <Typography variant="body2" color="text.secondary">
            ({daysSinceHire})
          </Typography>
        </Box>

        <DeactivationButton employee={employee} isActive={isActive} />
      </Stack>
    </Stack>
  );
};

export default EmployeeDetails;
