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
    return this.employeeRepository.find();
  }
}
