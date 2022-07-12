import { AppModule } from '@/app.module';
import { AuthController } from '../auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let authController: AuthController;
  let app:TestingModule
  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });
  const userInfo = {
    username: 'sunzehui',
    password: 'sunzehui',
  };

  describe('用户登录', () => {
    it('should register!"', async () => {
      const res = await authController.login(userInfo);
      expect(res.code).toBe(200);
      expect(res.data).toBeDefined();
      expect(res.data.token).toBeDefined();
      expect(res.data.token.expires).toBeDefined();
      expect(res.data.token.value).toBeDefined();
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
