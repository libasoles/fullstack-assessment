export interface Employee extends Omit<DTO.Employee, "hireDate"> {
  id: number;
  avatar: string;
  daysSinceHire: string;
  name: () => string;
  hireDate: () => string;
  isActive: boolean;
}
