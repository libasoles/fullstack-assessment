import config from "@/config/config";
import { Department } from "@/types/Department";
import { Employee } from "@/types/Employee";
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
    department: employee.department as Department,
    daysSinceHire: formattedDuration,
    isActive: employee.isActive as boolean,
    name: () => `${employee.firstName} ${employee.lastName}`,
    hireDate: (format = config.dates.format) =>
      dayjs(employee.hireDate).format(format),
  };
}
