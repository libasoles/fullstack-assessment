namespace DTO {
  export interface Department {
    id: number;
    name?: string;
  }

  export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    department: Department;
    phone: string;
    address: string;
    isActive?: boolean;
  }

  export type DepartmentHistory = {
    date: string;
    department: Department;
  };
}
