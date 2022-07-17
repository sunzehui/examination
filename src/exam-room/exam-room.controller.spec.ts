import * as request from 'supertest';
import { destroyModule, getAppServer, getToken } from '@/common/utils/test';
import * as _get from 'lodash/get';
import { randomInt } from 'crypto';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
describe('ExamRoomController', () => {
  const teacher = {
    username: 'sunzehui_t',
    password: 'sunzehui_t',
  };
  const student = {
    username: 'sunzehui',
    password: 'sunzehui',
  };

  describe('学生禁止新建考场', () => {
    it('should create examination room', async () => {
      const token = await getToken(student);
      const appServer = await getAppServer();
      const res = await request(appServer)
        .post('/exam-room')
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
    let newRoomId = null;
    let newPaperId = null;
    let newClassId = null;
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
    it('should create room', async () => {
      const res = await requestApp
        .post('/exam-room')
        .send({
          exam_paper_id: newPaperId,
          classes_id: newClassId,
          begin_time: dayjs('2022-7-11').utc().format(),
          end_time: dayjs('2022-7-19').utc().format(),
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(_get(res, 'body.data.id')).toBeDefined();
      expect(res.statusCode).toBe(200);
      newRoomId = res.body.data.id;
    });
    it('should get room info', async () => {
      const res = await requestApp
        .get('/exam-room/' + newRoomId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.data.use_exam_paper.id).toBe(newPaperId);
      expect(res.body.data.for_classes.id).toBe(newClassId);
    });
    it('should get all room info', async () => {
      const res = await requestApp
        .get('/exam-room')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
