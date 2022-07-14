import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from '@/classes/entities/classes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classes])],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
