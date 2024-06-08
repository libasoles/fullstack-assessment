import { Department } from '../department.entity';

export function createDepartment(data?: Partial<Department>) {
  const randomId = Math.floor(Math.random() * 30);

  return new Department({
    id: randomId,
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
