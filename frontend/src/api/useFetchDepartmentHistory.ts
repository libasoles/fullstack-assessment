import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { mapDepartmentHistory } from "./mappers";
import { DEPARTMENT_HISTORY } from "./queryKeys";

async function fetchDepartmentHistory(employeeId: number) {
  const response = await fetch(endpointFor.departmenHistory(employeeId));

  return await response.json();
}

type useFetchEmployeeProps = { employeeId: Employee["id"] };

export function useFetchDepartmentHistory({
  employeeId,
}: useFetchEmployeeProps): UseQueryResult<DTO.DepartmentHistory[]> {
  return useQuery({
    queryKey: [DEPARTMENT_HISTORY],
    queryFn: () => fetchDepartmentHistory(employeeId),
    select: mapDepartmentHistory,
  });
}
