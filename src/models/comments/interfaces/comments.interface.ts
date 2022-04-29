export interface IComment {
  id?: string;
  content: string;
  writer: string;
  parentId?: number;
  createdAt?: Date;
}
