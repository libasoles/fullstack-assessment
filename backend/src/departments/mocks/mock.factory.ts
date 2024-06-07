import { Department } from '../department.entity';

export function createDepartment(data?: Partial<Department>) {
  return new Department({
    id: 1,
    name: 'Sales',
    ...data,
  });
}

export const departments = [
  'Engineering',
  'Sales',
  'Marketing',
  'Finance',
  'HR',
  'Legal',
  'Operations',
  'Customer Service',
].map((name, id) => createDepartment({ id, name }));
