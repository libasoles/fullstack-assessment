import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { mapDepartmentHistory } from "./mappers";
import { DEPARTMENT_HISTORY } from "./queryKeys";

async function fetchDepartmentHistory(employeeId: Employee["id"]) {
  const response = await axios.get(endpointFor.departmentHistory(employeeId));

  return response.data;
}

type useFetchEmployeeProps = { employeeId: Employee["id"] };

export function useFetchDepartmentHistory({
  employeeId,
}: useFetchEmployeeProps): UseQueryResult<DTO.DepartmentHistory[]> {
  return useQuery({
    queryKey: [DEPARTMENT_HISTORY, String(employeeId)],
    queryFn: () => fetchDepartmentHistory(employeeId),
    select: mapDepartmentHistory,
  });
}
