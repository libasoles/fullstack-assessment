import { getRepositoryToken } from '@nestjs/typeorm';
import { DepartmentHistory } from '../entities/departmentHistory.entity';
import { Employee } from '../entities/employee.entity';
import {
  anEmployee,
  anotherEmployee,
  anUpdatedEmployee,
  createDeparmentHistoryRecord,
} from './mock.factory';

export const nonExistentEmployeeId = 999;

const employeesRepositoryMock = {
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
    delete: jest.fn().mockImplementation((employeeId) => {
      if (employeeId === nonExistentEmployeeId)
        return {
          affected: 0,
        };

      return {
        affected: 1,
      };
    }),
  },
};

const aDepartmentChangeRecord = createDeparmentHistoryRecord();
const anotherDepartmentChangeRecord = createDeparmentHistoryRecord({
  employeeId: 1,
  departmentId: 3,
});

const departmentHistoryRepositoryMock = {
  provide: getRepositoryToken(DepartmentHistory),
  useValue: {
    find: jest
      .fn()
      .mockResolvedValue([
        aDepartmentChangeRecord,
        anotherDepartmentChangeRecord,
      ]),
  },
};

export const repositoryMocks = [
  employeesRepositoryMock,
  departmentHistoryRepositoryMock,
];
