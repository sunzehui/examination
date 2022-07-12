import {  HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

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
      return await this.repository.save(userDO);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
  findLoginUser(username: string) {
    return this.repository.findOneBy({ username });
  }
}
