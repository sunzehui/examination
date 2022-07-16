import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '@/common/module/auth/decorator/role.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const username = createUserDto.username;
    const password = createUserDto.password;
    const userDO = {
      username,
      password,
    };
    try {
      const user = this.repository.create(userDO);
      return await this.repository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  findLoginUser(username: string) {
    return this.repository.findOne({
      where: { username },
      select: ['username', 'password', 'user_type', 'id'],
    });
  }

  getAllStudent() {
    return this.repository.findBy({ user_type: Role.student });
  }

  setUserType(id: number, toType: Role) {
    return this.repository.update(
      { id },
      {
        user_type: toType,
      },
    );
  }
}
