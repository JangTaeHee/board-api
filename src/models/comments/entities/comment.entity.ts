import { Board } from '@root/models/board/entities/board.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
  Index,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.comments)
  board: Board;

  @Index()
  @Column()
  boardId: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @Column({ default: () => '(NOW)' })
  createdAt: Date;

  @TreeChildren()
  children: Comment[];

  @TreeParent()
  parent: Comment;
}
