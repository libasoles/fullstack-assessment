import { Test, TestingModule } from '@nestjs/testing';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import dbMocks from './mock.db';
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
      providers: [EmployeesService, dbMocks],
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
      const response = await controller.updateEmployee(anUpdatedEmployee);

      expect(response).toEqual(anUpdatedEmployee);
    });

    it('should delete an employee', async () => {
      const response = await controller.deleteEmployee(anEmployee.id);

      expect(response).toEqual({ affected: 1 });
    });
  });
});
