namespace DTO {
  interface Department {
    id?: number;
    name: string;
  }

  export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    hireDate: Date;
    department: Department;
    phone: string;
    address: string;
  }
}
