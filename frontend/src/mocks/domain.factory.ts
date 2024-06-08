// Domain objects not related to any external system

import { Employee } from "@/types/Employee";

export function createEmployee(data: Partial<Employee> = {}) {
  const completeName =
    data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : "Juan De la Cruz";

  return {
    id: 18,
    firstName: "Juan",
    lastName: "De la Cruz",
    completeName,
    hireDate: () => "February 3, 2024",
    daysSinceHire: "1y 4m 7d",
    department: {
      id: 1,
      name: "Engineering",
    },
    phone: "(+55) 1234567890",
    address: "Manila, 445",
    ...data,
  } as Employee;
}
