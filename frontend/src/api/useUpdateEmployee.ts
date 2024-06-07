import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { DEPARTMENT_HISTORY, EMPLOYEE, EMPLOYEES } from "./queryKeys";

async function updateEmployee(data: Partial<DTO.Employee>) {
  return axios.patch(`${endpointFor.employees}/${data.id as number}`, data);
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<DTO.Employee>) => updateEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE] });
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_HISTORY] });
    },
  });
}
