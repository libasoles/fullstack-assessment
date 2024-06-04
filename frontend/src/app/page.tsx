import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Employees() {
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Box sx={{ alignSelf: "flex-end" }}>
          <Button variant="outlined" size="small">
            Add Employee
          </Button>
        </Box>

        <EmployeesList />
      </Stack>
    </Box>
  );
}
