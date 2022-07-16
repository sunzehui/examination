import { randomInt } from 'crypto';
import { destroyModule, getAppServer } from '@/common/utils/test';
import * as request from 'supertest';

describe('AppController', () => {
  const userInfo = {
    username: 'sunzehui' + randomInt(999),
    password: 'sunzehui',
  };
  // const teacher = {
  //   username: 'sunzehui_t',
  //   password: 'sunzehui_t',
  // };
  // const student = {
  //   username: 'sunzehui',
  //   password: 'sunzehui',
  // };
  let token = null;
  describe('用户注册', () => {
    let appServer = null;
    it('should register!"', async () => {
      appServer = await getAppServer();
      let requestApp = request(appServer);
      const res = await requestApp
        .post('/user/register')
        .set('Accept', 'application/json')
        .send(userInfo);
      // await request(appServer)
      //   .post('/user/register')
      //   .set('Accept', 'application/json')
      //   .send(student);
      // const teacherRes = await request(appServer)
      //   .post('/user/register')
      //   .set('Accept', 'application/json')
      //   .send(teacher);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.username).toBe(userInfo.username);
    });
    describe('用户登录', () => {
      it('should register!"', async () => {
        const appServer = await getAppServer();
        const res = await request(appServer)
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(userInfo);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.token).toBeDefined();
        expect(res.body.data.token.expires).toBeDefined();
        token = res.body.data.token.value;
        expect(res.body.data.token.value).toBeDefined();
      });
    });
    it('should set user type', async function () {
      let requestApp = request(appServer);
      const type_map = {
        student: 0,
        teacher: 1,
      };
      const res = await requestApp
        .patch('/user/type?to_type=' + type_map['teacher'])
        .set('Authorization', 'Bearer ' + token);
      console.log(res.body);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
