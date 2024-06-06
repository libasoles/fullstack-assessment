import { Employee } from "@/types/Employee";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { mapEmployees } from "./mappers";
import { EMPLOYEES } from "./queryKeys";

async function fetchEmployees() {
  const response = await axios.get(endpointFor.employees);

  return response.data;
}

export function useFetchEmployees(): UseQueryResult<Employee[]> {
  return useQuery({
    queryKey: [EMPLOYEES],
    queryFn: fetchEmployees,
    select: mapEmployees,
  });
}
