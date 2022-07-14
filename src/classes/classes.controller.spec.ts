import { ClassesController } from './classes.controller';
import * as request from 'supertest';
import { destroyModule, getAppServer, getToken } from '@/common/utils/test';
import * as _get from 'lodash/get';

describe('ClassesController', () => {
  const teacher = {
    username: 'sunzehui_t',
    password: 'sunzehui_t',
  };
  const student = {
    username: 'sunzehui',
    password: 'sunzehui',
  };

  describe('学生禁止创建', () => {
    it('should create class', async () => {
      const token = await getToken(student);
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/classes/create')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      const data = res.body;
      expect(data.statusCode).toBe(403);
    });
  });

  describe('老师操作', () => {
    let token, requestApp;
    it('should get token', async function () {
      token = await getToken(teacher);
      const appServer = await getAppServer();
      requestApp = await request(appServer);
    });
    let studentList = [];
    let newClassId = null;

    it('should find all student', async () => {
      const res = await requestApp
        .get('/user/student')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      const data = res.body;

      expect(res.statusCode).toBe(200);
      studentList = data.data.map((u) => ({
        user_id: u.id,
      }));
    });
    it('should create class', async () => {
      const res = await requestApp
        .post('/classes/create')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      const data = res.body;
      expect(_get(data, 'data.id')).toBeDefined();
      expect(res.statusCode).toBe(200);
      newClassId = data.data.id;
    });
    it('should get class info', async () => {
      const res = await requestApp
        .get('/classes/' + newClassId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(_get(res, 'body.data.id')).toBeDefined();
      expect(res.statusCode).toBe(200);
    });
    it('should add student to class', async () => {
      expect(newClassId).toBeDefined();

      const res = await requestApp
        .patch('/classes/' + newClassId)
        .send(studentList)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      const data = res.body;

      expect(res.statusCode).toBe(200);

      expect(res.body.statusCode).toBe(200);

      const signStuList = studentList.map((u) => ({ id: u.user_id }));
      expect(_get(data, 'data.users')).toBeDefined();
      expect(res.body.data.users).toEqual(signStuList);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
