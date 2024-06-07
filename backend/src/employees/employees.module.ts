import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentHistory } from './DepartmentHistory.entity';
import { DepartmentHistoryService } from './departmentHistory.service';
import { Employee } from './Employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([DepartmentHistory]),
  ],
  providers: [EmployeesService, DepartmentHistoryService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
