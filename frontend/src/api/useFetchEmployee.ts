import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { mapEmployee } from "./mappers";
import { EMPLOYEE } from "./queryKeys";

async function fetchEmployee(id: Employee["id"]) {
  const response = await axios.get(`${endpointFor.employees}/${id}`);

  return response.data;
}

type useFetchEmployeeProps = { id: Employee["id"] };

const fiveMinutes = 1000 * 60 * 5;

export function useFetchEmployee({
  id,
}: useFetchEmployeeProps): UseQueryResult<Employee> {
  return useQuery({
    queryKey: [EMPLOYEE, String(id)],
    queryFn: () => fetchEmployee(id),
    select: mapEmployee,
    staleTime: fiveMinutes,
  });
}
