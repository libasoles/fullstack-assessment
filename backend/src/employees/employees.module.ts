import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsHistoryService } from './departmentsHistory.service';
import { Employee } from './Employee.entity';
import { EmployeeDepartment } from './EmployeeDepartment.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([EmployeeDepartment]),
  ],
  providers: [EmployeesService, DepartmentsHistoryService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
