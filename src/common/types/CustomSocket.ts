import { Socket } from 'socket.io';
import { User } from '@/common/module/user/entities/user.entity';

export class CustomSocket extends Socket {
  user: User;
}
