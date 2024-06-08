import { createDepartment } from 'src/departments/mocks/mock.factory';
import { DepartmentHistory } from '../entities/departmentHistory.entity';
import { Employee } from '../entities/employee.entity';

export function createEmployee(data?: Partial<Employee>) {
  return new Employee({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    hireDate: new Date(),
    department: createDepartment({ name: 'Engineering' }),
    phone: '1234567890',
    address: 'Manila, 445',
    isActive: true,
    ...data,
  });
}

export function createDeparmentHistoryRecord(
  data?: Partial<DepartmentHistory>,
) {
  return new DepartmentHistory({
    employeeId: 1,
    departmentId: 1,
    date: new Date(),
    ...data,
  });
}

export const anEmployeeWithoutId = createEmployee();
export const anEmployeeWithoutDepartmentId = createEmployee({
  department: { name: 'Bug hunting' },
});

export const aValidEmployee = createEmployee({ id: 1, ...anEmployeeWithoutId });
export const anotherValidEmployee = createEmployee({
  id: 2,
  firstName: 'Pedro',
});

export const anEmployeeBeingUpdated = createEmployee({
  firstName: 'Juan Manuel',
  lastName: 'De la Cruz',
  hireDate: new Date('2021-04-03'),
  department: createDepartment({ id: 3 }),
  phone: '(+54) 123456789',
  address: 'Manilla, 435',
});

const anEmployeeWithoutMandatoryData = createEmployee();
delete anEmployeeWithoutMandatoryData.firstName;
delete anEmployeeWithoutMandatoryData.department;

export { anEmployeeWithoutMandatoryData };

export const aDepartmentRecord = createDeparmentHistoryRecord();
export const anotherDepartmentRecord = createDeparmentHistoryRecord({
  employeeId: 1,
  departmentId: 3,
});
