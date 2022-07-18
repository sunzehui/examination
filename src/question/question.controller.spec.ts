import * as request from 'supertest';
import { destroyModule, getAppServer, getToken } from '@/common/utils/test';

const QList = [
  {
    type: 0,
    resolution: 'haha',
    content: 'nihao',
    answer: [
      {
        content: 'a',
        is_answer: false,
      },
      {
        content: 'haha',
        is_answer: true,
      },
      {
        content: 'xixix',
        is_answer: false,
      },
    ],
  },
  {
    type: 1,
    resolution: 'haha',
    content: 'xixixinihao',
    answer: [
      {
        content: 'a',
        pos: 3,
      },
      {
        content: 'haha',
        pos: 11,
      },
      {
        content: 'xixix',
        pos: 22,
      },
    ],
  },
];
describe('QuestionController', () => {
  const teacher = {
    username: 'sunzehui_t',
    password: 'sunzehui_t',
  };
  const student = {
    username: 'sunzehui',
    password: 'sunzehui',
  };

  describe('学生禁止新建问题', () => {
    it('should cant create question', async () => {
      const token = await getToken(student);
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/question')
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
    let newQId = null;
    it('should  create question', async () => {
      const token = await getToken(teacher);
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/question')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(QList);
      const data = res.body;
      expect(data.data[0].content).toBe(QList[0].content);
      expect(data.data[1].content).toBe(QList[1].content);
      newQId = data.data[0].id;
    });
    it('should  get question detail', async () => {
      const token = await getToken(teacher);
      const appServer = await getAppServer();
      expect(newQId).toBeDefined();
      const res = await request(appServer)
        .get('/question/' + newQId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      const data = res.body;
      expect(data.data.id).toBe(newQId);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
