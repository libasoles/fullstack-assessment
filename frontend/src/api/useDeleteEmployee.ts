import { Employee } from "@/types/Employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { endpointFor } from "./endpoints";
import { EMPLOYEES } from "./queryKeys";

function deleteEmployee(id: Employee["id"]) {
  return axios.delete(`${endpointFor.employees}/${id}`);
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Employee["id"]) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES] });
    },
  });
}
