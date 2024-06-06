export interface Department {
  id: number;
  name: string;
}

export interface DepartmentHistory {
  date: string;
  department: Department;
}
