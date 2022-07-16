import { TypeOrmModule } from '@nestjs/typeorm';
import connectionCfg from './config/database';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/common/module/user/user.module';
import { AuthModule } from './common/module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './classes/classes.module';
import { ExamPaperModule } from './exam-paper/exam-paper.module';
import { QuestionModule } from './question/question.module';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionCfg),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    ClassesModule,
    ExamPaperModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

export const testModule = (entities) => ({
  imports: [
    TypeOrmModule.forRoot({ ...connectionCfg, entities }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    ExamPaperModule,
    ClassesModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
});
