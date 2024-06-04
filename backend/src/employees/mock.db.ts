import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './Employee.entity';
import { anEmployee, anotherEmployee, anUpdatedEmployee } from './mock.factory';

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
    findOne: jest.fn().mockResolvedValue(anEmployee),
    delete: jest.fn().mockResolvedValue({
      affected: 1,
    }),
  },
};
