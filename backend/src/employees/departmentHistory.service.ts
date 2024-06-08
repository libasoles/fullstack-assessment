import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, map } from 'rxjs';
import { Repository } from 'typeorm';
import { EmployeesService } from './employees.service';
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

    await this.repository.save(
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
    private readonly employeeService: EmployeesService,
    private readonly departmentHistoryService: DepartmentHistoryService,
  ) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    const employeeId = context.getArgByIndex(0)?.params?.id;
    const currentEmployeeData = employeeId
      ? await this.employeeService.getOne(employeeId)
      : null;

    return handler.handle().pipe(
      map(async (employee) => {
        const shouldLogDepartmentChange =
          !employeeId ||
          currentEmployeeData.department.id !== employee.department.id;

        if (shouldLogDepartmentChange) {
          return await this.departmentHistoryService.saveDepartmentChange(
            employee,
          );
        }

        return employee;
      }),
    );
  }
}
