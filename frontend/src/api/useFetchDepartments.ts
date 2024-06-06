import { Department } from "@/types/Department";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { DEPARTMENTS } from "./queryKeys";

async function fetchDepartments() {
  const response = await fetch(endpointFor.departments);

  return await response.json();
}

const oneHour = 1000 * 60 * 60;

export function useFetchDepartments(): UseQueryResult<Department[]> {
  return useQuery({
    queryKey: [DEPARTMENTS],
    queryFn: fetchDepartments,
    staleTime: oneHour,
  });
}
