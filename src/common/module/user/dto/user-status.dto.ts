import { Role } from '@/common/module/auth/decorator/role.decorator';

export interface UserStatusDTO {
  username: string;
  id?: number;
  password?: string;
  role?: Role;
}
