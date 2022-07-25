import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassmateDto } from './dto/update-class.dto';
import { Repository } from 'typeorm';
import { Classes } from '@/classes/entities/classes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as _map from 'lodash/map';
import { User } from '@/common/module/user/entities/user.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly repo: Repository<Classes>,
  ) {}

  create(createClassDto: CreateClassDto, userId) {
    const classesEntity = this.repo.create({
      created_by: { id: userId },
      name: createClassDto.name,
    });
    return this.repo.save(classesEntity);
  }

  find() {
    return this.repo.find({
      relations: ['users'],
    });
  }

  findOne(id) {
    return this.repo.findOneBy({
      id,
    });
  }

  findStudent(id: number) {
    return this.repo.find({
      where: { id },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          username: 'user.username',
          id: 'user.id',
        },
      },
    });
  }

  async addStudent(id: number, classmateDto: ClassmateDto[]) {
    const classesEntity = await this.repo.findOneBy({ id });
    classesEntity.users = _map(classmateDto, (u) => {
      const userEntity = new User();
      userEntity.id = u.user_id;
      return userEntity;
    });

    const newClassesEntity = this.repo.create(classesEntity);
    return this.repo.save(newClassesEntity);
  }

  async joinClass(id: number, userId) {
    const userEntity = new User();
    userEntity.id = userId;
    const classesEntity = await this.repo.findOne({
      where: { id },
      relations: ['users'],
    });

    classesEntity.users.push(userEntity);

    const newClassesEntity = this.repo.create(classesEntity);
    return this.repo.save(newClassesEntity);
  }
}
