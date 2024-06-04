import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './Department.entity';
import { departments } from './mock.factory';

export default {
  provide: getRepositoryToken(Department),
  useValue: {
    find: jest.fn().mockResolvedValue(departments),
  },
};
