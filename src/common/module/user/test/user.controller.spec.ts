import { randomInt } from 'crypto';
import { destroyModule, getAppServer } from '@/common/utils/test';
import * as request from 'supertest';

describe('AppController', () => {
  const userInfo = {
    username: 'sunzehui' + randomInt(999),
    password: 'sunzehui',
  };
  describe('用户注册', () => {
    it('should register!"', async () => {
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/user/register')
        .set('Accept', 'application/json')
        .send(userInfo);

      expect(res).toBeDefined();
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.username).toBe(userInfo.username);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
