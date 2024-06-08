import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  DepartmentHistoryService,
  LogEmployeeDepartment,
} from './departmentHistory.service';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly departmentsHistoryService: DepartmentHistoryService,
  ) {}

  @Post()
  @UseInterceptors(LogEmployeeDepartment)
  async createEmployee(@Body() employee: Employee) {
    if (!employee.department?.id) {
      throw new HttpException(
        'Deparment { id } is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.employeesService.create(employee);
  }

  @Get()
  async getAllEmployees() {
    return await this.employeesService.getAll();
  }

  @Get(':id')
  async getEmployee(@Param('id') id: number) {
    const employee = await this.employeesService.getOne(id);

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return employee;
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
    return await this.departmentsHistoryService.getDepartmentHistory(id);
  }
}
