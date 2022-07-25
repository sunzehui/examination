import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from '@/classes/entities/classes.entity';
import { User } from '@/common/module/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classes, User])],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
