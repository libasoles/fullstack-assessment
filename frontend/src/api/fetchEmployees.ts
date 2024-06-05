import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { mapEmployees } from "./mappers";
import { EMPLOYEES } from "./queryKeys";

async function fetchEmployees() {
  const res = await fetch(endpointFor.employees);

  return await res.json();
}

export function useFetchEmployees(): UseQueryResult<Employee[]> {
  return useQuery({
    queryKey: [EMPLOYEES],
    queryFn: fetchEmployees,
    select: mapEmployees,
  });
}
