import { Department } from "@/types/Department";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { DEPARTMENTS } from "./queryKeys";

const fetchDepartments = async () => {
  const response = await fetch(endpointFor.departments);

  return await response.json();
};

export function useFetchDepartments(): UseQueryResult<Department[]> {
  return useQuery({
    queryKey: [DEPARTMENTS],
    queryFn: fetchDepartments,
  });
}
