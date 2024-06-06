import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, map } from 'rxjs';
import { Repository } from 'typeorm';
import { Employee } from './Employee.entity';
import { EmployeeDepartment } from './EmployeeDepartment.entity';

@Injectable()
export class DepartmentsHistoryService {
  constructor(
    @InjectRepository(EmployeeDepartment)
    private repository: Repository<EmployeeDepartment>,
  ) {}

  async saveDepartmentChange(employee: Employee) {
    const employeeId = employee.id;
    const departmentId = employee.department.id;

    this.repository.save(
      new EmployeeDepartment({
        employeeId,
        departmentId,
        date: new Date(),
      }),
    );
  }

  async getDepartmentsHistory(employeeId: Employee['id']) {
    return this.repository.find({
      where: { employeeId },
      relations: ['department'],
    });
  }
}

@Injectable()
export class LogEmployeeDepartment implements NestInterceptor {
  constructor(
    private readonly departmentsHistoryService: DepartmentsHistoryService,
  ) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map(async (employee) => {
        this.departmentsHistoryService.saveDepartmentChange(employee);
      }),
    );
  }
}
