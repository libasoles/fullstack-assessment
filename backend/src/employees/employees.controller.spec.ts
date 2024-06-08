import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentHistoryService } from './departmentHistory.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { nonExistentEmployeeId, repositoryMocks } from './mocks/mock.db';
import {
  anEmployeeBeingUpdated,
  anEmployeeWithoutDepartmentId,
  anEmployeeWithoutId,
  anotherValidEmployee,
  aValidEmployee,
} from './mocks/mock.factory';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        DepartmentHistoryService,
        ...repositoryMocks,
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  describe('Happy path', () => {
    it('should return a confirmation with data when creating a new employee', async () => {
      const response = await controller.createEmployee(anEmployeeWithoutId);

      expect(response).toEqual(aValidEmployee);
    });

    it('should return all employees', async () => {
      const response = await controller.getAllEmployees();

      expect(response).toEqual([aValidEmployee, anotherValidEmployee]);
    });

    it('should return a single employee', async () => {
      const response = await controller.getEmployee(aValidEmployee.id);

      expect(response).toEqual(aValidEmployee);
    });

    it('should update an employee', async () => {
      const response = await controller.updateEmployee(
        anEmployeeBeingUpdated.id,
        anEmployeeBeingUpdated,
      );

      expect(response).toEqual(anEmployeeBeingUpdated);
    });

    it('should delete an employee', async () => {
      const response = await controller.deleteEmployee(aValidEmployee.id);

      expect(response).toEqual({ affected: 1 });
    });
  });

  describe('Error cases', () => {
    it('should throw an exception when creating an employee without a department', async () => {
      await expect(
        controller.createEmployee(anEmployeeWithoutDepartmentId),
      ).rejects.toThrow('Deparment { id } is required');
    });

    it('should throw an exception when fetching a non-existing employee', async () => {
      await expect(
        controller.getEmployee(nonExistentEmployeeId),
      ).rejects.toThrow('Employee not found');
    });

    it('should throw an exception when updating a non-existing employee', async () => {
      await expect(
        controller.updateEmployee(nonExistentEmployeeId, aValidEmployee),
      ).rejects.toThrow('Employee not found');
    });

    it('should return 0 affected rows if employee doesnt exists', async () => {
      const response = await controller.deleteEmployee(nonExistentEmployeeId);

      expect(response).toEqual({ affected: 0 });
    });
  });
});
