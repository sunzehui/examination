import axios from 'axios';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { randomInt } from 'crypto';
import { treeKillSync } from '@nestjs/cli/lib/utils/tree-kill';
import * as isEmpty from 'lodash/isEmpty';
import { extensionRegex } from 'ts-loader/dist/constants';
export enum QType {
  choice,
  fill_blank,
}
dayjs.extend(utc);

let requestApp = axios.create({
  baseURL: 'http://localhost:3000/api',
});
const testResource = {
  teacher: null,
  student: [],
  classes: null,
  QList: [
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
          content: '潍坊',
          pos: 1,
        },
        {
          content: '临沂',
          pos: 5,
        },
      ],
    },
  ],
  QAnswer: null,
  examPaper: null,
  questionIds: [],
  examRoom: null,
};
const useTokenRequest = async (user) => {
  const res = await requestApp.post('auth/login', user);
  const token = res.data.data.token.value;
  return axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
beforeAll(async () => {});

describe('创建用户', () => {
  it('should create teacher entity', async function () {
    const random = randomInt(9999);

    const teacher = {
      username: 'teacher' + random,
      password: 'teacher' + random,
    };
    await requestApp.post('user/register', teacher);
    const request = await useTokenRequest(teacher);

    await request.patch('/user/type?to_type=1');

    testResource.teacher = teacher;
  });

  it('should create student entity', async function () {
    const studentList = new Array(5).fill(0).map((item) => {
      const random = randomInt(9999);
      return {
        username: 'student' + random,
        password: 'student' + random,
      };
    });
    const createStudentTask = studentList.map((s) => {
      return requestApp.post('user/register', s);
    });
    try {
      await Promise.all(createStudentTask);
      testResource.student = studentList;
    } catch (e) {
      console.log(e.response.data);
    }
  });
});

describe('老师创建班级,，学生加入班级', () => {
  it('should create classes', async function () {
    const classes = {
      name: '测试幼儿园' + randomInt(999),
    };
    const request = await useTokenRequest(testResource.teacher);
    const classesResult = await request.post('classes', classes);
    testResource.classes = classesResult.data.data;
  });
  it('should join classes', async function () {
    const classesId = testResource.classes.id;

    const studentList = testResource.student;

    for await (const request of studentList.map((s) => useTokenRequest(s))) {
      await request.post('classes/join/' + classesId);
    }
  });
});

describe('老师创建试卷后创建考场', function () {
  it('should create paper', async function () {
    const request = await useTokenRequest(testResource.teacher);
    const paper = {
      name: '智力测试',
    };
    const result = await request.post('exam-paper', paper);
    testResource.examPaper = result.data.data;
  });
  it('should create question', async function () {
    const request = await useTokenRequest(testResource.teacher);
    const result = await request.post('question', testResource.QList);
    testResource.questionIds = result.data.data.map((q) => q.id);
  });
  it('should add question to paper', async function () {
    const request = await useTokenRequest(testResource.teacher);
    await Promise.all(
      testResource.questionIds.map((qId) => {
        return request.patch(
          'exam-paper/' +
            testResource.examPaper.id +
            '/question/add?q_id=' +
            qId,
        );
      }),
    );
  });
  it('should create exam room', async function () {
    const request = await useTokenRequest(testResource.teacher);
    const examRoom = {
      name: '测试考场',
      exam_paper_id: testResource.examPaper.id,
      classes_ids: [testResource.classes.id],
      begin_time: dayjs().add(60, 'second').format(),
      desc: 'hahaha',
      end_time: dayjs().add(1, 'day').format(),
    };
    const result = await request.post('exam-room', examRoom);
    testResource.examRoom = result.data.data;
  });
  it('should find user exam room', async function () {
    const studentList = testResource.student;
    for await (const request of studentList.map((s) => useTokenRequest(s))) {
      const result = await request.get('exam-room');
      expect(isEmpty(result.data.data)).toBe(false);
    }
  });
  it('should get paper detail', async function () {
    const request = await useTokenRequest(testResource.teacher);
    const result = await request.get('exam-paper/' + testResource.examPaper.id);
    testResource.examPaper = result.data.data;
  });
});

// // 多个学生参加同一场考试
describe('学生做题并提交', function () {
  it('should enter exam room', async function () {
    const studentList = testResource.student;

    for await (const request of studentList.map((s) => useTokenRequest(s))) {
      await request.post(
        'exam-record/enter',
        {},
        {
          params: {
            room_id: testResource.examRoom[0].id,
            paper_id: testResource.examPaper.id,
          },
        },
      );
    }
  });
  it('should submit paper', async function () {
    const paper = testResource.examPaper;
    const QAnswer = paper.question.map((q) => {
      const type = q.type;
      let answer = [];
      const mockAnswer = [
        { content: '孙泽辉', pos: '1', id: 37 },
        { content: '孙泽辉', pos: '5', id: 37 },
        { content: '临沂', pos: '5', id: 36 },
        { content: '临沂', pos: '1', id: 36 },
      ];
      switch (type) {
        case QType.choice:
          answer = q.answer.map((a) => a.id).splice(randomInt(2), randomInt(2));
          break;
        case QType.fill_blank:
          const answer1 = mockAnswer[randomInt(3)];
          answer1.id = q.answer[0].id;
          answer1.pos = q.answer[0].pos;
          const answer2 = mockAnswer[randomInt(3)];
          answer2.id = q.answer[1].id;
          answer2.pos = q.answer[1].pos;
          answer = [answer1, answer2];
      }
      return {
        qId: q.id,
        answer,
        type: q.type,
      };
    });
    const studentList = testResource.student;
    for await (const request of studentList.map((s) => useTokenRequest(s))) {
      const result = await request.post(
        `exam-paper/${testResource.examPaper.id}/submit`,
        QAnswer,
        {
          params: {
            room_id: testResource.examRoom[0].id,
          },
        },
      );
      console.log(result.data.data);
    }
  });
});
// describe('学生查询该考试统计分数');
