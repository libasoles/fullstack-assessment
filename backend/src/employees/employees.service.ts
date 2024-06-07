import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async getAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['department'],
      order: {
        hireDate: 'DESC',
      },
    });
  }

  async getOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });
  }

  async update(
    id: number,
    partialEmployee: Partial<Employee>,
  ): Promise<Employee> {
    const employeeToUpdate = await this.getOne(id);
    if (!employeeToUpdate) {
      throw new Error('Employee not found');
    }

    return this.employeeRepository.save(
      new Employee({
        ...employeeToUpdate,
        ...partialEmployee,
        id: Number(id),
      }),
    );
  }

  async delete(id: number) {
    const result = await this.employeeRepository.delete(id);

    return { affected: result.affected };
  }
}
