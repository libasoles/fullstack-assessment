import { Employee } from "@/app/types/Employee";
import config from "@/config/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { mapEmployees } from "./mappers";

async function fetchEmployees() {
  const res = await fetch(`${config.api.baseUrl}/employees`);

  return await res.json();
}

export function useFetchEmployees(): UseQueryResult<Employee[]> {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    select: mapEmployees,
  });
}
