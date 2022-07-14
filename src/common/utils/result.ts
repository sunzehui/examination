export interface ResultData<T> {
  statusCode: number;

  message?: string;

  data?: T;
}

export class ResultData<T> {
  constructor(code = 200, msg?: string, data?: T) {
    this.statusCode = code;
    this.message = msg || 'ok';
    this.data = data || null;
  }

  statusCode: number;

  message?: string;

  data?: T;

  static ok<T>(data?: T, msg?: string): ResultData<T> {
    return new ResultData(200, msg, data);
  }

  static fail<T>(code: number, msg?: string, data?: T): ResultData<T> {
    return new ResultData(code || 500, msg || 'fail', data);
  }
}
