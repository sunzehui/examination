import * as request from 'supertest';
import { destroyModule, getAppServer, getToken } from '@/common/utils/test';
import * as _get from 'lodash/get';
import { randomInt } from 'crypto';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const QList = [
  {
    type: 0,
    resolution: '答案',
    content: '人有几只眼睛',
    answer: [
      {
        content: '一只',
        is_answer: false,
      },
      {
        content: '一双',
        is_answer: true,
      },
      {
        content: '三个',
        is_answer: false,
      },
    ],
  },
  {
    type: 1,
    resolution: '暂无解析',
    content: '我是，我来自',
    answer: [
      {
        content: '孙新阳',
        pos: 1,
      },
      {
        content: '临沂',
        pos: 5,
      },
    ],
  },
];

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
    let newQId = null;
    let newQId2 = null;
    let newRoomId = null;
    let newClassId = null;
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
      newQId2 = data.data[1].id;
    });
    it('should add question to paper', async () => {
      const res = await requestApp
        .patch('/exam-paper/' + newPaperId + '/question?q_id=' + newQId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      await requestApp
        .patch('/exam-paper/' + newPaperId + '/question?q_id=' + newQId2)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);

      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.data.name).toBe(name);
    });
    let paperInfo = null;
    it('should get paper info', async () => {
      const res = await requestApp
        .get('/exam-paper/' + newPaperId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      expect(newPaperId).toBeDefined();
      expect(res.statusCode).toBe(200);
      console.log(JSON.stringify(res.body.data));
      paperInfo = res.body.data;
      expect(res.body.statusCode).toBe(200);
      expect(res.body.data.name).toBe(name);
    });

    it('should submit user-paper', async () => {
      console.log(paperInfo.question[0].answer[0].id);
      const QAnswer = [
        {
          type: 0,
          qId: newQId,
          answer: paperInfo.question[0].answer[2].id,
        },
        {
          type: 1,
          qId: newQId2,
          answer: [
            {
              content: '孙新阳',
              pos: 1,
              id: paperInfo.question[1].answer[0].id,
            },
            {
              content: 'wf',
              pos: 5,
              id: paperInfo.question[1].answer[1].id,
            },
          ],
        },
      ];
      const stuToken = await getToken(student);
      const res = await requestApp
        .post('/exam-paper/' + newPaperId + '/submit?room_id=' + newRoomId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + stuToken)
        .send(QAnswer);

      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
    });
    it('should find exam record', async function () {
      const stuToken = await getToken(student);

      const res = await requestApp
        .get('/exam-record')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + stuToken);

      expect(res.statusCode).toBe(200);
      expect(res.body.statusCode).toBe(200);
    });
    it('should find exam record detail', async function () {
      const stuToken = await getToken(student);

      const res = await requestApp
        .get('/exam-record/1')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + stuToken);
      expect(res.body.data.id).toBe(1);
    });
  });

  afterAll(async () => {
    await destroyModule();
  });
});
