import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Employee } from './employee.entity';

describe('CreateUserDto', () => {
  it('should have errors when there are missing fields', () => {
    const fields = [
      'firstName',
      'lastName',
      'hireDate',
      'department',
      'phone',
      'address',
    ];

    const incompleteEmployee = plainToClass(Employee, {
      id: 67,
      isActive: true,
    });

    const errors = validateSync(incompleteEmployee);

    expect(errors).toHaveLength(fields.length);

    errors.forEach((error) => {
      expect(fields).toContain(error.property);
    });
  });

  it('should validate max length of fields', () => {
    const fields = ['firstName', 'lastName', 'phone', 'address'];

    const createUserDto = plainToClass(Employee, {
      firstName: 'Juan Manuel xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      lastName: 'De la Cruz xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      hireDate: new Date('2021-04-03'),
      department: {
        id: 1,
        name: 'IT',
      },
      phone: '(+54) 123456789 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      address: 'Manilla, 435 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      isActive: true,
    });

    const errors = validateSync(createUserDto);

    expect(errors).toHaveLength(fields.length);

    errors.forEach((error) => {
      expect(fields).toContain(error.property);
    });
  });
});
