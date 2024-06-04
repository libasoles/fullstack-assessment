import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './Employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { createEmployee } from './mock.factory';

const anEmployee = createEmployee({ id: 1 });
const anotherEmployee = createEmployee({ id: 2, firstName: 'Pedro' });

describe('EmployeesController', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            save: jest.fn().mockResolvedValue(anEmployee),
            find: jest.fn().mockResolvedValue([anEmployee, anotherEmployee]),
            findOne: jest.fn().mockResolvedValue(anEmployee),
            delete: jest.fn().mockResolvedValue({
              affected: 1,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  describe('controller', () => {
    it('should return a confirmation with data when creating a new employee', async () => {
      const response = await controller.createEmployee(anEmployee);

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

    it('should delete an employee', async () => {
      const response = await controller.deleteEmployee(anEmployee.id);

      expect(response).toEqual({ affected: 1 });
    });
  });
});
