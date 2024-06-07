import { Department } from '../../departments/Department.entity';
import { createDepartment } from '../../departments/mocks/mock.factory';
import { DepartmentHistory } from '../entities/DepartmentHistory.entity';
import { Employee } from '../entities/Employee.entity';

export function createEmployee(data?: Partial<Employee>) {
  return new Employee({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    hireDate: new Date(),
    department: new Department({ name: 'Engineering' }),
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

export const anEmployee = createEmployee({ id: 1, ...anEmployeeWithoutId });
export const anotherEmployee = createEmployee({ id: 2, firstName: 'Pedro' });

export const anUpdatedEmployee = createEmployee({
  id: 1,
  firstName: 'Juan Manuel',
  lastName: 'De la Cruz',
  hireDate: new Date('2021-04-03'),
  department: createDepartment(),
  phone: '(+54) 123456789',
  address: 'Manilla, 435',
});

const aNewEmployeeWithoutMandatoryData = createEmployee();
delete aNewEmployeeWithoutMandatoryData.firstName;
delete aNewEmployeeWithoutMandatoryData.department;

export { aNewEmployeeWithoutMandatoryData };
