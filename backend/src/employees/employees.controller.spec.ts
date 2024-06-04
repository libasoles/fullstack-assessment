import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './Department.entity';
import { Employee } from './Employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { createEmployee } from './mock.factory';

const anEmployeeWithoutId = createEmployee();

const anEmployee = createEmployee({ id: 1, ...anEmployeeWithoutId });
const anotherEmployee = createEmployee({ id: 2, firstName: 'Pedro' });

const anUpdatedEmployee = createEmployee({
  id: 1,
  firstName: 'Juan Manuel',
  lastName: 'De la Cruz',
  hireDate: new Date('2021-04-03'),
  department: new Department('Sales'),
  phone: '(+54) 123456789',
  address: 'Manilla, 435',
});

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
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  describe('controller', () => {
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
