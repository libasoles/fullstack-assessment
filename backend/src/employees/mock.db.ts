import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './Employee.entity';
import { anEmployee, anotherEmployee, anUpdatedEmployee } from './mock.factory';

export const nonExistentEmployeeId = 999;

export default {
  provide: getRepositoryToken(Employee),
  useValue: {
    save: jest.fn().mockImplementation((employee) => {
      if (employee.id) {
        return Promise.resolve(anUpdatedEmployee);
      }
      return Promise.resolve(anEmployee);
    }),
    find: jest.fn().mockResolvedValue([anEmployee, anotherEmployee]),
    findOne: jest.fn().mockImplementation(({ where }) => {
      if (where.id === nonExistentEmployeeId) return null;

      return anEmployee;
    }),
    delete: jest.fn().mockResolvedValue({
      affected: 1,
    }),
  },
};
