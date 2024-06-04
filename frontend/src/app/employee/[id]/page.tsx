"use client";

import { useFetchEmployee } from "@/api/fetchEmployee";
import DeactivationButton from "@/components/DeactivationButton";
import { DepartmentSelect } from "@/components/DepartmentSelect";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import { InfoRow } from "@/components/InfoRow";
import Loading from "@/components/Loading";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Employee as EmployeeType } from "../../types/Employee";

type Props = {
  params: { id: number };
};

export default function Employee({ params }: Props) {
  const { id } = params;

  const { data: employee, isLoading, isError } = useFetchEmployee({ id });

  if (isLoading) return <Loading />;

  // TODO: handle error somehow
  if (isError || !employee) return <Loading />;

  const {
    avatar,
    firstName,
    name,
    phone,
    address,
    hireDate,
    daysSinceHire,
    isActive,
  } = employee as EmployeeType;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY"); // TODO: move date format to config

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between">
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
              <DepartmentSelect employee={employee} />
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Box>
            <Typography color="text.secondary">Hire date</Typography>
            <Typography variant="body2">{formattedDate} </Typography>
            <Typography variant="body2" color="text.secondary">
              ({daysSinceHire})
            </Typography>
          </Box>

          <DeactivationButton employee={employee} isActive={isActive} />
        </Stack>
      </Stack>
    </Stack>
  );
}
