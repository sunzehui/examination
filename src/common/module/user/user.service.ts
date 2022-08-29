import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import {
  constants,
  promises as fsPromises,
  createWriteStream,
  createReadStream,
  unlinkSync,
} from 'fs';
import { resolve as pathContcat } from 'path';
import { queryFailedGuard } from '@/common/utils/tools';
import { staticRoutePath } from '@/app.module';
import { Classes } from '@/classes/entities/classes.entity';
import { UpdateUserDto } from '@/common/module/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const username = createUserDto.username;
    const password = createUserDto.password;
    const nickname = createUserDto.nickname;

    const userDO = {
      username,
      password,
      nickname,
    };
    if (createUserDto.classes) {
      const classesEntity = new Classes();
      classesEntity.id = createUserDto.classes;
      userDO['join_classes'] = classesEntity;
    }
    try {
      const user = this.repository.create(userDO);
      return await this.repository.save(user);
    } catch (error) {
      if (queryFailedGuard(error)) {
        switch (error.code) {
          case 'ER_DUP_ENTRY':
            throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
          default:
            throw error;
        }
      }
    }
  }

  findLoginUser(username: string) {
    return this.repository.findOne({
      where: { username },
      select: ['username', 'password', 'user_type', 'id'],
    });
  }

  async updateProfile(userId: number, userDto: UpdateUserDto) {
    return await this.repository.update(
      {
        id: userId,
      },
      userDto,
    );
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

  async findOneById(id: number) {
    return await this.repository.findOneBy({ id });
  }
  async getUserProfile(userId: number) {
    return await this.repository.findOne({
      where: { id: userId },
      relations: ['join_classes', 'created_classes'],
    });
  }

  async setUserAvatar(userId, file, uploadFileDto) {
    if (!file) throw new HttpException('file not found', 400);
    await this.checkDir(pathContcat('static'));
    const fileName = userId + Date.now() + uploadFileDto.name;
    await fsPromises.writeFile(`${staticRoutePath}/${fileName}`, file.buffer);
    const userEntity = this.repository.create({
      id: userId,
      avatar_url: fileName,
    });
    return await this.repository.save(userEntity);
  }

  private async checkDir(dirPath: string) {
    try {
      // Check if segment directory exists
      await fsPromises.access(dirPath, constants.F_OK);
    } catch (ex) {
      // Create segment directory if not exist
      await fsPromises.mkdir(dirPath, { recursive: true });
    }
  }
}
