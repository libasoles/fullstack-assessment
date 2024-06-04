import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './Employee.entity';

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
    return this.employeeRepository.find({ relations: ['department'] });
  }

  async getOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });
  }

  async update(employee: Partial<Employee>): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async delete(id: number) {
    const result = await this.employeeRepository.delete(id);

    return { affected: result.affected };
  }
}
