import { Department } from "@/app/types/Department";
import config from "@/config/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DEPARTMENTS } from "./queryKeys";

const fetchDepartments = async () => {
  const response = await fetch(`${config.api.baseUrl}/departments`);

  return await response.json();
};

export function useFetchDepartments(): UseQueryResult<Department[]> {
  return useQuery({
    queryKey: [DEPARTMENTS],
    queryFn: fetchDepartments,
  });
}
