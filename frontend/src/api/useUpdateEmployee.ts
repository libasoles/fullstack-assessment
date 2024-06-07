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
    onMutate: async (partialEmployee: Partial<DTO.Employee>) => {
      const targetQueryKey = [EMPLOYEE, String(partialEmployee.id)];

      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: targetQueryKey });
      const employee = queryClient.getQueryData(targetQueryKey) as DTO.Employee;

      queryClient.setQueryData(targetQueryKey, (old: DTO.Employee) => ({
        ...employee,
        ...partialEmployee,
      }));

      return { employee };
    },
    onError: (error, variables, context) => {
      const employee = context?.employee as DTO.Employee;

      // Rollback the cache update on error
      queryClient.setQueryData(
        [EMPLOYEE, String(employee.id)],
        context?.employee
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_HISTORY] });
    },
  });
}
