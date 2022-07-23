import { ApiProperty } from "@nestjs/swagger";


export class ResultData<T> {
  constructor(code = 200, msg?: string, data?: T) {
    this.statusCode = code;
    this.message = msg || 'ok';
    this.data = data || null;
  }
  @ApiProperty({
    type:Number,
    description:"业务状态码",
    default:"200"
  })
  statusCode: number;

  @ApiProperty({
    type:String,
    default:"ok",
    description:"描述"
  })
  message?: string;

  data?: T;

  static ok<T>(data?: T, msg?: string): ResultData<T> {
    return new ResultData(200, msg||'ok', data);
  }

  static fail<T>(code: number, msg?: string, data?: T): ResultData<T> {
    return new ResultData(code || 500, msg || 'fail', data);
  }
}
