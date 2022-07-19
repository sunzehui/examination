import { destroyModule, getAppServer } from '@/common/utils/test';
import * as request from 'supertest';

describe('AppController', () => {
  const userInfo = {
    username: 'sunzehui_t',
    password: 'sunzehui_t',
  };

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
      expect(res.body.data.token.value).toBeDefined();
      console.log(res.body.data.token.value);
    });
  });
  afterAll(async () => {
    await destroyModule();
  });
});
