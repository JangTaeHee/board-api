import { Comment } from '@root/models/comments/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({
    length: 3000,
  })
  content: string;

  @Column()
  writer: string;

  @Column({ select: false })
  password?: string;

  @Column({ default: () => '(NOW)' })
  createdAt: Date;

  @Column({ default: () => '(NOW)' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
