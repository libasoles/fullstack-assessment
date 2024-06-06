import AddNewEmployeeButton from "@/components/sections/EmployeesList/AddNewEmployeeForm";
import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Employees() {
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Box sx={{ alignSelf: "flex-end" }}>
          <AddNewEmployeeButton />
        </Box>

        <EmployeesList />
      </Stack>
    </Box>
  );
}
