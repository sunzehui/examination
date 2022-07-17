import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { testModule } from '@/app.module';
import { User } from '@/common/module/user/entities/user.entity';
import { Classes } from '@/classes/entities/classes.entity';
import { INestApplication } from '@nestjs/common';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import {
  ChoiceQ,
  FillBlankQ,
  Question,
} from '@/question/entities/question.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';

let app: INestApplication = null;
let module_inner: TestingModule = null;

export const getApp = async (): Promise<[INestApplication, TestingModule]> => {
  if (app && module) return [app, module_inner];
  module_inner = await Test.createTestingModule(
    testModule([
      User,
      Classes,
      ExamPaper,
      ChoiceQ,
      FillBlankQ,
      Question,
      ExamRoom,
    ]),
  ).compile();
  app = module_inner.createNestApplication();
  await app.init();
  return [app, module_inner];
};
export const getAppServer = async () => {
  const [app] = await getApp();
  return app.getHttpServer();
};
export const destroyModule = async () => {
  const [app, module] = await getApp();
  await module.close();
  await app.close();
};

export const getToken = async (user) => {
  const appServer = await getAppServer();
  const res = await request(appServer)
    .post('/auth/login')
    .send(user)
    .set('Accept', 'application/json');
  const data = res.body.data;
  // expect(res.statusCode).toBe(200);
  return data.token.value;
};
