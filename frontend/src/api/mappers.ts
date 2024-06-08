// From DTOs to domain entities

import config from "@/config/config";
import { Department, DepartmentHistory } from "@/types/Department";
import { Employee } from "@/types/Employee";
import { daysSince } from "@/utils/date";
import dayjs from "dayjs";

export function mapEmployees(employees: DTO.Employee[]): Employee[] {
  return employees.map(mapEmployee);
}

export function mapEmployee(employee: DTO.Employee): Employee {
  const formattedDuration = daysSince(employee.hireDate);
  const { longDateFormat } = config.dates;
  const { id, firstName, lastName, department, isActive } = employee;

  return {
    ...employee,
    id: id as Employee["id"],
    completeName: `${firstName} ${lastName}`,
    department: department as Department,
    isActive: isActive as boolean,
    daysSinceHire: formattedDuration,
    hireDate: (as = longDateFormat) => dayjs(employee.hireDate).format(as),
  };
}

export function mapDepartmentHistory(
  record: DTO.DepartmentHistory[]
): DepartmentHistory[] {
  return record.map(mapHistoryRecord);
}

function mapHistoryRecord(record: DTO.DepartmentHistory): DepartmentHistory {
  const { americanDateFormat } = config.dates;
  const { department, date } = record;

  return {
    department: department as Department,
    date: dayjs(date).format(americanDateFormat),
  };
}
