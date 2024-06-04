import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get(':id')
  async getEmployee(@Param('id') id: number) {
    return await this.employeesService.getOne(id);
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() employee: Partial<Employee>,
  ) {
    return await this.employeesService.update(id, employee);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeesService.delete(id);
  }
}
