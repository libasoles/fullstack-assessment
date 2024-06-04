import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ConstructorParams = {
  id?: number;
  name: string;
};

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  constructor(params?: ConstructorParams) {
    if (params) Object.assign(this, params);
  }
}
