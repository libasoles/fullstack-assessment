import { DepartmentSelect } from "@/components/DepartmentSelect";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import { InfoRow } from "@/components/InfoRow";
import { daysSince } from "@/utils/date";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const employee = {
  id: 8,
  firstName: "Juan",
  lastName: "De la Cruz",
  hireDate: "2024-07-04T00:00:00.000Z",
  department: {
    id: 1,
    name: "Sales",
  },
  phone: "(+54) 1234567890",
  address: "Siempre Viva, 413",
};

type Props = {
  params: { id: number };
};

export default function Employee({ params }: Props) {
  const { id } = params;
  const { firstName, lastName, department, phone, address, hireDate } =
    employee;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY");
  const formattedDuration = daysSince(hireDate);

  const isEmployeeDeactivated = true;

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
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
