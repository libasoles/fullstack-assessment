import DepartmentHistory from "@/components/sections/EmployeeDetails/DepartmentHistory";
import EmployeeDetails from "@/components/sections/EmployeeDetails/EmployeeDetails";
import { routes } from "@/config/routes";
import { Employee } from "@/types/Employee";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export const metadata = {
  title: "Employee Details",
};

type Props = {
  params: { id: Employee["id"] };
};

export default function EmployeePage({ params }: Props) {
  const { id } = params;

  return (
    <Stack spacing={4} data-testid="employee-details-view">
      <Box sx={{ alignSelf: "flex-end" }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ChevronLeft />}
          href={routes.home}
          LinkComponent={Link}
        >
          Go Back
        </Button>
      </Box>

      <Stack spacing={16}>
        <EmployeeDetails employeeId={id} />

        <DepartmentHistory employeeId={id} />
      </Stack>
    </Stack>
  );
}
