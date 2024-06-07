import { Department } from "@/types/Department";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { DEPARTMENTS } from "./queryKeys";

async function fetchDepartments() {
  const response = await axios.get(endpointFor.departments);

  return response.data;
}

const oneHour = 1000 * 60 * 60;

export function useFetchDepartments(): UseQueryResult<Department[]> {
  return useQuery({
    queryKey: [DEPARTMENTS],
    queryFn: fetchDepartments,
    staleTime: oneHour, // TODO: figure out why it only works on a single page, even though we navigate with Next Link
  });
}
