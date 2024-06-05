"use client";

import EmployeeDetails from "@/components/sections/EmployeeDetails/EmployeeDetails";
import { routes } from "@/config/routes";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type Props = {
  params: { id: number };
};

export default function Employee({ params }: Props) {
  const { id } = params;

  return (
    <Stack spacing={4} data-testid="employee-details-view">
      <Box sx={{ alignSelf: "flex-end" }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ChevronLeft />}
          href={routes.home}
        >
          Go Back
        </Button>
      </Box>

      <EmployeeDetails employeeId={id} />
    </Stack>
  );
}
