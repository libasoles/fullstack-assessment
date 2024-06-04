import config from "@/config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EMPLOYEE, EMPLOYEES } from "./queryKeys";

async function updateEmployee(data: Partial<DTO.Employee>) {
  return fetch(`${config.api.baseUrl}/employees/${data.id}`, {
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
