import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private deparmentService: DepartmentsService) {}

  @Get()
  async getAllDepartments() {
    return await this.deparmentService.getAll();
  }
}
