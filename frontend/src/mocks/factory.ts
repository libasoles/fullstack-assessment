import { Employee } from "@/types/Employee";

export function createEmployee(data: Partial<Employee> = {}) {
  return {
    id: 18,
    firstName: "Romina",
    lastName: "De la Cruz",
    hireDate: "2020-12-04T00:56:58.332Z",
    department: {
      id: 1,
      name: "Engineering",
    },
    phone: "(+55) 1234567890",
    address: "Manila, 445",
    ...data,
  };
}
