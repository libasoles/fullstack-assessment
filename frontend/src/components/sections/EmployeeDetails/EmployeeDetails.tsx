"use client";

import { useFetchEmployee } from "@/api/fetchEmployee";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import Loading from "@/components/Loading";
import NoContent from "@/components/NoContent";
import DepartmentForm from "@/components/sections/DepartmentSelect/DepartmentForm";
import DeactivationButton from "@/components/sections/EmployeeDetails/DeactivationButton";
import { InfoRow } from "@/components/sections/EmployeeDetails/InfoRow";
import { Employee as EmployeeType } from "@/types/Employee";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  employeeId: number;
};

const EmployeeDetails = ({ employeeId: id }: Props) => {
  const { data: employee, isLoading, isError } = useFetchEmployee({ id });

  if (isLoading) return <Loading />;

  if (isError || !employee)
    return (
      <NoContent
        variant="error"
        message="We Couldn't retrieve the employee data. Make sure you have the correct link"
      />
    );

  const {
    avatar,
    firstName,
    phone,
    address,
    daysSinceHire,
    isActive,
    name,
    hireDate,
  } = employee as EmployeeType;

  return (
    <Stack direction={{ lg: "row" }} justifyContent="space-between">
      <Stack direction="row" spacing={2}>
        <EmployeeAvatar
          src={avatar}
          alt={firstName}
          isDeactivated={!isActive}
        />
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
      <Stack spacing={4} sx={{ m: { xs: 8 } }}>
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
