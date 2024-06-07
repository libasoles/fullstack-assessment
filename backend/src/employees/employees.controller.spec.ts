import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentHistoryService } from './departmentHistory.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { nonExistentEmployeeId, repositoryMocks } from './mock.db';
import {
  anEmployee,
  anEmployeeWithoutId,
  anotherEmployee,
  anUpdatedEmployee,
} from './mock.factory';

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

      expect(response).toEqual(anEmployee);
    });

    it('should return all employees', async () => {
      const response = await controller.getAllEmployees();

      expect(response).toEqual([anEmployee, anotherEmployee]);
    });

    it('should return a single employee', async () => {
      const response = await controller.getEmployee(anEmployee.id);

      expect(response).toEqual(anEmployee);
    });

    it('should update an employee', async () => {
      const response = await controller.updateEmployee(
        anUpdatedEmployee.id,
        anUpdatedEmployee,
      );

      expect(response).toEqual(anUpdatedEmployee);
    });

    it('should delete an employee', async () => {
      const response = await controller.deleteEmployee(anEmployee.id);

      expect(response).toEqual({ affected: 1 });
    });
  });

  describe('Error cases', () => {
    it('should throw an exception when updating a non-existing employee', async () => {
      await expect(
        controller.updateEmployee(nonExistentEmployeeId, anUpdatedEmployee),
      ).rejects.toThrow('Employee not found');
    });

    it('should return 0 affected rows if employee doesnt exists', async () => {
      const response = await controller.deleteEmployee(nonExistentEmployeeId);

      expect(response).toEqual({ affected: 0 });
    });
  });
});
