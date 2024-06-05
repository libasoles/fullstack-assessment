import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ConstructorParams = {
  id?: number;
  name: string;
};

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @MaxLength(50)
  @Column()
  name: string;

  constructor(params?: ConstructorParams) {
    if (params) Object.assign(this, params);
  }
}
