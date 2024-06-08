import { plainToClass as create } from 'class-transformer';
import { validateSync as validate } from 'class-validator';
import { Employee } from './employee.entity';

describe('CreateUserDto', () => {
  it('should have errors when there are missing fields', () => {
    const missingFields = [
      'firstName',
      'lastName',
      'hireDate',
      'department',
      'phone',
      'address',
    ];

    const incompleteEmployee = create(Employee, {
      id: 67,
      isActive: true,
    });

    const errors = validate(incompleteEmployee);

    expect(errors).toHaveLength(missingFields.length);

    errors.forEach((error) => {
      expect(missingFields).toContain(error.property);
    });
  });

  it('should validate max length of fields', () => {
    const constrainedFields = ['firstName', 'lastName', 'phone', 'address'];

    const employeeDto = create(Employee, {
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

    const errors = validate(employeeDto);

    expect(errors).toHaveLength(constrainedFields.length);

    errors.forEach((error) => {
      expect(constrainedFields).toContain(error.property);
    });
  });
});
