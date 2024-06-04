import { Dayjs } from "dayjs";

export interface Employee extends Omit<DTO.Employee, "hireDate"> {
  hireDate: Dayjs;
}
