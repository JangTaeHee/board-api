import { Board } from '@root/models/board/entities/board.entity';
import { Comment } from '@root/models/comments/entities/comment.entity';
import * as pbkdf2 from 'pbkdf2';

export function encryptedPassword(password: string, secret: string) {
  const encrypted = pbkdf2.pbkdf2Sync(password, secret, 1, 32, 'sha512');
  return encrypted.toString('hex');
}

export function notification(
  writer: string,
  item: Board | Comment,
  includeKeywords: string[],
) {
  // TODO - notification
}
