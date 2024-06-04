import { Dayjs } from "dayjs";

export interface Employee extends Omit<DTO.Employee, "hireDate"> {
  id: number;
  hireDate: Dayjs;
  avatar: string;
  name: () => string;
  daysSinceHire: string;
  isDeactivated: boolean;
}
