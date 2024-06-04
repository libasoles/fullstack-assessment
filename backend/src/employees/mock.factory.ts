import { Department } from './Department.entity';
import { Employee } from './Employee.entity';

export function createEmployee(data?: Partial<Employee>) {
  return new Employee({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    hireDate: new Date(),
    department: new Department('Engineering'),
    phone: '1234567890',
    address: 'Manila, 445',
    ...data,
  });
}
