import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentHistoryService } from './departmentHistory.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DepartmentHistory } from './entities/DepartmentHistory.entity';
import { Employee } from './entities/Employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([DepartmentHistory]),
  ],
  providers: [EmployeesService, DepartmentHistoryService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
