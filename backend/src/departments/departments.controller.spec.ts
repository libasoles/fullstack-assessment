import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import dbMocks from './mock.db';
import { departments } from './mock.factory';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService, dbMocks],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
  });

  it('should return all departments', async () => {
    const response = await controller.getAllDepartments();

    expect(response).toBe(departments);
  });
});
