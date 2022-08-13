export type ExamRoomRecordDto = {
  examRoomId: number;
  action: RecordActionType;
  data: Record<number, any>;
};
export enum RecordActionType {
  get,
  set,
}
