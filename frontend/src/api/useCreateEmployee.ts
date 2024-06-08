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

      const randomId = Math.floor(Math.random() * 1000);

      queryClient.setQueryData([EMPLOYEES], (old: DTO.Employee[]) => [
        { ...employee, isActive: true, id: randomId },
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
        queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
        handleSuccess();
      }
    },
  });
}
