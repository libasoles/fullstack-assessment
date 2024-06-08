import { Department } from "@/types/Department";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { DEPARTMENTS } from "./queryKeys";

async function fetchDepartments() {
  const response = await axios.get(endpointFor.departments);

  return response.data;
}

export function useFetchDepartments(): UseQueryResult<Department[]> {
  return useQuery({
    queryKey: [DEPARTMENTS],
    queryFn: fetchDepartments,
    staleTime: Infinity,
  });
}
