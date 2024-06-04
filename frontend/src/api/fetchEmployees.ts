import { Employee } from "@/app/types/Employee";
import config from "@/config/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { mapEmployees } from "./mappers";
import { EMPLOYEES } from "./queryKeys";

async function fetchEmployees() {
  const res = await fetch(`${config.api.baseUrl}/employees`);

  return await res.json();
}

export function useFetchEmployees(): UseQueryResult<Employee[]> {
  return useQuery({
    queryKey: [EMPLOYEES],
    queryFn: fetchEmployees,
    select: mapEmployees,
  });
}
