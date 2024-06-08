import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import AddNewEmployeeButton from "@/components/sections/NewEmployeeForm/NewEmployeeForm";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export const metadata = {
  title: "Employees",
};

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
