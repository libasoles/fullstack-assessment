import { Employee } from "@/types/Employee";

export const routes = {
  home: "/",
  employee: (id: Employee["id"]) => `/employee/${id}`,
};
