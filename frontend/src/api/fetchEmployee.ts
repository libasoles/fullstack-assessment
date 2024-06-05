import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { mapEmployee } from "./mappers";
import { EMPLOYEE } from "./queryKeys";

async function fetchEmployee(id: Employee["id"]) {
  const res = await fetch(endpointFor.employee(id));

  return await res.json();
}

type useFetchEmployeeProps = { id: Employee["id"] };

export function useFetchEmployee({
  id,
}: useFetchEmployeeProps): UseQueryResult<Employee> {
  return useQuery({
    queryKey: [EMPLOYEE],
    queryFn: () => fetchEmployee(id),
    select: mapEmployee,
  });
}
