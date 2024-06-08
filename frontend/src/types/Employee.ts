export interface Employee extends Omit<DTO.Employee, "hireDate"> {
  id: number;
  daysSinceHire: string;
  completeName: string;
  hireDate: () => string;
  isActive: boolean;
}
