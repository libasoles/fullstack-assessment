namespace DTO {
  interface Department {
    id: number;
    name: string;
  }

  export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    department: Department;
    phone: string;
    address: string;
  }
}
