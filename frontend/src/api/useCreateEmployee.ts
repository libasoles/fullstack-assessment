import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { EMPLOYEES } from "./queryKeys";

async function createEmployee(employee: DTO.Employee) {
  return await axios.post(endpointFor.employees, employee);
}

type useCreateEmployeeProps = {
  onSuccess: () => void;
};

export function useCreateEmployee({
  onSuccess: handleSuccess,
}: useCreateEmployeeProps) {
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
    onError: (error, variables, context) => {
      // Rollback the cache update on error
      queryClient.setQueryData([EMPLOYEES], context?.previousEmployees);
    },
    onSettled: (response, error, variables, context) => {
      if (!response?.status) {
        queryClient.setQueryData([EMPLOYEES], context?.previousEmployees);
      } else {
        // We keep the optimistic update, so we don't disturb the order of appeareance
        handleSuccess();
      }
    },
  });
}
