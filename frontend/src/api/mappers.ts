import { Employee } from "@/app/types/Employee";
import { Department } from "@/types/Department";
import { daysSince } from "@/utils/date";
import dayjs from "dayjs";

export function mapEmployees(employees: DTO.Employee[]): Employee[] {
  return employees.map(mapEmployee);
}

export function mapEmployee(employee: DTO.Employee): Employee {
  const formattedDuration = daysSince(employee.hireDate);

  return {
    ...employee,
    id: employee.id as number,
    hireDate: dayjs(employee.hireDate),
    department: employee.department as Department,
    avatar: "/avatar.jpg", // TODO: use an actual existing image or grab it from server when possible
    name: () => `${employee.firstName} ${employee.lastName}`,
    daysSinceHire: formattedDuration,
    isDeactivated: false, // TODO: implement deactivation
  };
}
