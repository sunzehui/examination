import { QueryFailedError } from 'typeorm';

export const queryFailedGuard = (
  err: any,
): err is QueryFailedError & { code: string } =>
  err instanceof QueryFailedError;
