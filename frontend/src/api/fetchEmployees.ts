import { Employee } from "@/app/types/Employee";
import config from "@/config/config";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

async function fetchEmployees() {
  const res = await fetch(`${config.api.baseUrl}/employees`);

  return await res.json();
}

export function useFetchEmployees(): UseQueryResult<Employee[]> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    select: mapEmployee,
  });
}

function mapEmployee(employees: DTO.Employee[]): Employee[] {
  return employees.map((employee) => ({
    ...employee,
    hireDate: new Date(employee.hireDate),
  }));
}
