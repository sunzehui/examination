import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/common/user/entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import connectionCfg from '@/config/database';
import { randomInt } from 'crypto';
describe('AppController', () => {
  let userController: UserController;
  let user: TestingModule
  beforeEach(async () => {
    user = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...connectionCfg, entities: [User] }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
      exports: [UserService],
    }).compile();

    userController = user.get<UserController>(UserController);
  });
  const userInfo = {
    username: 'sunzehui' + randomInt(999),
    password: 'sunzehui',
  };
  describe('用户注册', () => {
    it('should register!"', async () => {
      const res = await userController.register(userInfo);
      expect(res).toBeDefined();
      expect(res.code).toBe(200);
      expect(res.data).toBeDefined();
      expect(res.data.username).toBe(userInfo.username);
    });
  });

  afterAll(async () => {
    await user.close();
  });
});
