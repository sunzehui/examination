import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionCfg from '@/config/database';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;
  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...connectionCfg, entities: [] })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
