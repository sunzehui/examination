import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassmateDto } from './dto/update-class.dto';
import { Repository } from 'typeorm';
import { Classes } from '@/classes/entities/classes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as _map from 'lodash/map';
import * as _get from 'lodash/get';
import { User } from '@/common/module/user/entities/user.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly repo: Repository<Classes>,
  ) {}

  create(createClassDto: CreateClassDto, userId) {
    const userEntities = _get(createClassDto, 'students', []).map((userId) => {
      const entity = new User();
      entity.id = userId;
      return entity;
    });
    const classesEntity = this.repo.create({
      created_by: { id: userId },
      name: createClassDto.name,
      users: userEntities,
    });
    return this.repo.save(classesEntity);
  }

  async anonymousFindAllClasses() {
    return await this.repo.find({
      select: ['id', 'name'],
    });
  }

  find() {
    return this.repo.find({
      relations: ['users'],
    });
  }
  async findMine(userId: number) {
    return await this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('user_classes', 'uc', 'uc.classesId = c.id')
      .where('uc.userId = :userId', { userId })
      .orWhere('c.createdById = :userId', { userId })
      .getMany();
  }

  findOne(id) {
    return this.repo.findOneBy({
      id,
    });
  }

  findStudent(id?: number) {
    const query = {};
    if (id) {
      query['id'] = id;
    }
    return this.repo.findOne({
      where: query,
      relations: ['users', 'created_by'],
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
