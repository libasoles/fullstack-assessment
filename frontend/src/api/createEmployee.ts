import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { EMPLOYEES } from "./queryKeys";

async function createEmployee(employee: DTO.Employee) {
  return await fetch(endpointFor.employees, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: DTO.Employee) => createEmployee(employee),
    onMutate: async (employee: DTO.Employee) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: [EMPLOYEES] });
      const previousEmployees = queryClient.getQueryData([EMPLOYEES]);

      queryClient.setQueryData([EMPLOYEES], (old: DTO.Employee[]) => [
        { ...employee, id: old.length + 1 },
        ...old,
      ]);

      return { previousEmployees };
    },
    onError: (err, variables, context) => {
      // Rollback the cache update on error
      queryClient.setQueryData([EMPLOYEES], context?.previousEmployees);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
    },
  });
}
