export interface Employee extends Omit<DTO.Employee, "hireDate"> {
  id: number;
  daysSinceHire: string;
  name: () => string;
  hireDate: () => string;
  isActive: boolean;
}
