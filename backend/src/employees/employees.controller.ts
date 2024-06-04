import { Body, Controller, Get, Post } from '@nestjs/common';
import { Employee } from './Employee.entity';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() employee: Employee) {
    return await this.employeesService.create(employee);
  }

  @Get()
  async getAllEmployees() {
    return await this.employeesService.getAll();
  }
}
