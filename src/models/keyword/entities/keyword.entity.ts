import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 3000,
  })
  keyword: string;

  @Column()
  writer: string;
}
