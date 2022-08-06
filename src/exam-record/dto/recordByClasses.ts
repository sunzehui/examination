interface ExamRoom {
  id: number;
  desc: string;
  name: string;
  create_time: string;
  begin_time: string;
  end_time: string;
  for_classes: ForClasses;
}

interface ForClasses {
  id: number;
  name: string;
  create_time: string;
  users: Users[];
}

export interface RecordByClasses {
  id: number;
  create_time: string;
  submit_time: string;
  answer: string;
  score: number;
  exam_room: ExamRoom;
}

interface Users {
  id: number;
  username: string;
  nickname: string;
  create_time: string;
  user_type: number;
  avatar_url: string;
}
