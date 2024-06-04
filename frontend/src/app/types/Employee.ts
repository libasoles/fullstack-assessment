export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  department: {
    id: number;
    name: string;
  };
  phone: string;
  address: string;
}
