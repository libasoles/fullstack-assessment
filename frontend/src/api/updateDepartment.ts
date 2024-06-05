import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { EMPLOYEE, EMPLOYEES } from "./queryKeys";

async function updateEmployee(data: Partial<DTO.Employee>) {
  return fetch(endpointFor.employee(data.id as number), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<DTO.Employee>) => updateEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE] });
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
    },
  });
}
