export interface IBoard {
  id?: number;
  subject: string;
  content: string;
  writer: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
