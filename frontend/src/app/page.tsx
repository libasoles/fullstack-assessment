import EmployeeCard from "@/components/EmployeeCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Employee } from "./types/Employee";

const response: Employee[] = [
  {
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
  },
  {
    id: 7,
    firstName: "Manuel",
    lastName: "Gonzales",
    hireDate: "2024-07-04T00:00:00.000Z",
    department: {
      id: 2,
      name: "IT",
    },
    phone: "(+54) 1234567890",
    address: "Manilla, 413",
  },
];

export default function Home() {
  return (
    <main>
      <Container>
        <Stack direction="column" spacing={2}>
          <Box sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" size="small">
              Add Employee
            </Button>
          </Box>

          <Stack gap={2}>
            {response.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
