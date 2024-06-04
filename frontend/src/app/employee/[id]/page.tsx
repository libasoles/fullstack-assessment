"use client";

import { useFetchEmployee } from "@/api/fetchEmployee";
import { DepartmentSelect } from "@/components/DepartmentSelect";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import { InfoRow } from "@/components/InfoRow";
import { daysSince } from "@/utils/date";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Employee as EmployeeType } from "../../types/Employee";

type Props = {
  params: { id: number };
};

export default function Employee({ params }: Props) {
  const { id } = params;

  const { data, isLoading } = useFetchEmployee({ id });

  if (isLoading) return <div>Loading...</div>;

  const { firstName, lastName, department, phone, address, hireDate } =
    data as EmployeeType;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY"); // TODO: move date format to config
  const formattedDuration = daysSince(hireDate);

  const isEmployeeDeactivated = true;

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {/* TODO: move default image to config */}
          <EmployeeAvatar src="/avatar.jpg" alt={firstName} />
          <Stack>
            <Typography variant="h5" component="div" gutterBottom>
              {firstName} {lastName}
            </Typography>

            <InfoRow label="Telephone" value={phone} />
            <InfoRow label="Address" value={address} />

            <Box mt={4}>
              <DepartmentSelect initialValue={department} />
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Box>
            <Typography color="text.secondary">Hire date</Typography>
            <Typography variant="body2">{formattedDate} </Typography>
            <Typography variant="body2" color="text.secondary">
              ({formattedDuration})
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            color={isEmployeeDeactivated ? "secondary" : "error"}
          >
            Deactivate
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
