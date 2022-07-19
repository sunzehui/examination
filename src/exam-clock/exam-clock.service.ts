import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExamRoomService } from '@/exam-room/exam-room.service';
import { AuthService } from '@/common/module/auth/auth.service';
import { UserService } from '@/common/module/user/user.service';
import { User } from '@/common/module/user/entities/user.entity';

@Injectable()
export class ExamClockService {
  constructor(
    private readonly examRoomService: ExamRoomService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async getUserFromSocket(socket): Promise<User> {
    const token = socket.handshake.headers.authorization;
    const decodedToken = await this.authService.verifyJwt(token);
    const user = await this.userService.findOneById(+decodedToken.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findAll(userId: number) {
    return await this.examRoomService.findAll(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} examClock`;
  }

  remove(id: number) {
    return `This action removes a #${id} examClock`;
  }
}
