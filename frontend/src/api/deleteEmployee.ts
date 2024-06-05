import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpointFor } from "./endpoints";
import { EMPLOYEES } from "./queryKeys";

function deleteEmployee(id: number) {
  return fetch(endpointFor.employee(id), {
    method: "DELETE",
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
    },
  });
}
