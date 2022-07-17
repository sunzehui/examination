import * as request from 'supertest';
import { destroyModule, getAppServer, getToken } from '@/common/utils/test';
import * as _get from 'lodash/get';
import { randomInt } from 'crypto';

describe('ExamPaperController', () => {
  const teacher = {
    username: 'sunzehui_t',
    password: 'sunzehui_t',
  };
  const student = {
    username: 'sunzehui',
    password: 'sunzehui',
  };

  describe('学生禁止新建试卷', () => {
    it('should create examination paper', async () => {
      const token = await getToken(student);
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/exam-paper')
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
    let newPaperId = null;
    const name = 'hahah' + randomInt(999);
    it('should create paper', async () => {
      const res = await requestApp
        .post('/exam-paper')
        .send({ name })
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(_get(res, 'body.data.id')).toBeDefined();
      expect(res.statusCode).toBe(200);
      newPaperId = res.body.data.id;
    });
    it('should get paper info', async () => {
      const res = await requestApp
        .get('/exam-paper/' + 8)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(newPaperId).toBeDefined();
      expect(res.statusCode).toBe(200);
      console.log(res.body.data);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.data.name).toBe(name);
    });
    it('should add question to paper', async () => {
      const res = await requestApp
        .patch('/exam-paper/' + newPaperId + '/question?q_id=2')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);

      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.data.name).toBe(name);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
