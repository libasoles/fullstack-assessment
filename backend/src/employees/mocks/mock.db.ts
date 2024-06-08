import { getRepositoryToken } from '@nestjs/typeorm';
import { DepartmentHistory } from '../entities/departmentHistory.entity';
import { Employee } from '../entities/employee.entity';
import {
  aDepartmentRecord,
  anEmployeeBeingUpdated,
  anotherDepartmentRecord,
  anotherValidEmployee,
  aValidEmployee,
} from './mock.factory';

export const nonExistentEmployeeId = 999;

const onSaveEmployee = jest.fn().mockImplementation((employee) => {
  const isEdition = employee.firstName === anEmployeeBeingUpdated.firstName;
  if (isEdition) {
    return Promise.resolve(anEmployeeBeingUpdated);
  }

  return Promise.resolve(aValidEmployee);
});

const onFindEmployee = jest
  .fn()
  .mockResolvedValue([aValidEmployee, anotherValidEmployee]);

const onFindOneEmployee = jest.fn().mockImplementation(({ where }) => {
  if (where.id === nonExistentEmployeeId) return null;

  return aValidEmployee;
});

const onDeleteEmployee = jest.fn().mockImplementation((employeeId) => {
  if (employeeId === nonExistentEmployeeId)
    return {
      affected: 0,
    };

  return {
    affected: 1,
  };
});

const employeesRepositoryMock = {
  provide: getRepositoryToken(Employee),
  useValue: {
    save: onSaveEmployee,
    find: onFindEmployee,
    findOne: onFindOneEmployee,
    delete: onDeleteEmployee,
  },
};

const onFindDepartmentHistory = jest
  .fn()
  .mockResolvedValue([aDepartmentRecord, anotherDepartmentRecord]);

const departmentHistoryRepositoryMock = {
  provide: getRepositoryToken(DepartmentHistory),
  useValue: {
    find: onFindDepartmentHistory,
  },
};

export const repositoryMocks = [
  employeesRepositoryMock,
  departmentHistoryRepositoryMock,
];
