import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlCfg, redisCfg } from './config/database';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/common/module/user/user.module';
import { AuthModule } from './common/module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './classes/classes.module';
import { ExamPaperModule } from './exam-paper/exam-paper.module';
import { QuestionModule } from './question/question.module';
import { ExamRoomModule } from './exam-room/exam-room.module';
import { ExamRecordModule } from './exam-record/exam-record.module';
import { ExamClockModule } from './exam-clock/exam-clock.module';
import configuration from './config/configuration';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from 'nestjs-redis';
import { pinoHttpOption } from '@/common/logger/config';
import { LoggerModule } from 'nestjs-pino';
export const staticRoutePath = join(__dirname, '..', '..', 'static');
@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlCfg),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RedisModule.register(redisCfg),
    BullModule.forRoot({
      redis: redisCfg,
    }),
    ServeStaticModule.forRoot({
      rootPath: staticRoutePath,
      exclude: ['api/*'],
      serveRoot: '/static',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: pinoHttpOption(),
    }),
    UserModule,
    AuthModule,
    ClassesModule,
    ExamPaperModule,
    QuestionModule,
    ExamRoomModule,
    ExamRecordModule,
    ExamClockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

export const testModule = (entities) => ({
  imports: [
    TypeOrmModule.forRoot({ ...mysqlCfg, entities }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    ExamPaperModule,
    ClassesModule,
    QuestionModule,
    ExamRoomModule,
    ExamClockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
});
