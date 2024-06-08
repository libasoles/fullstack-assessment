import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, map } from 'rxjs';
import { Repository } from 'typeorm';
import { DepartmentHistory } from './entities/departmentHistory.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class DepartmentHistoryService {
  constructor(
    @InjectRepository(DepartmentHistory)
    private repository: Repository<DepartmentHistory>,
  ) {}

  async saveDepartmentChange(employee: Employee) {
    const employeeId = employee.id;
    const departmentId = employee.department.id;

    this.repository.save(
      new DepartmentHistory({
        employeeId,
        departmentId,
        date: new Date(),
      }),
    );

    return employee;
  }

  async getDepartmentHistory(employeeId: Employee['id']) {
    return this.repository.find({
      where: { employeeId },
      relations: ['department'],
      order: {
        date: 'DESC',
      },
    });
  }
}

@Injectable()
export class LogEmployeeDepartment implements NestInterceptor {
  constructor(
    private readonly departmentHistoryService: DepartmentHistoryService,
  ) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map(async (employee) => {
        return this.departmentHistoryService.saveDepartmentChange(employee);
      }),
    );
  }
}
