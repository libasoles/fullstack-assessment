import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  DepartmentsHistoryService,
  LogEmployeeDepartment,
} from './departmentsHistory.service';
import { Employee } from './Employee.entity';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly departmentsHistoryService: DepartmentsHistoryService,
  ) {}

  @Post()
  @UseInterceptors(LogEmployeeDepartment)
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
  @UseInterceptors(LogEmployeeDepartment)
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

  @Get(':id/departments')
  async getDepartmentsHistory(@Param('id') id: number) {
    return await this.departmentsHistoryService.getDepartmentsHistory(id);
  }
}
