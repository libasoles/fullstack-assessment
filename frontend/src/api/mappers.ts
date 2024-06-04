import { Department } from "@/app/types/Department";
import { Employee } from "@/app/types/Employee";
import dayjs from "dayjs";

export function mapEmployees(employees: DTO.Employee[]): Employee[] {
  return employees.map(mapEmployee);
}

export function mapEmployee(employee: DTO.Employee): Employee {
  return {
    ...employee,
    hireDate: dayjs(employee.hireDate),
    department: employee.department as Department,
  };
}
