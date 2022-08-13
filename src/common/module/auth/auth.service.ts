import { ConfigService } from '@nestjs/config';
import { UserStatusDTO } from '../user/dto/user-status.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@/common/module/user/dto/login-user.dto';
import { UserService } from '@/common/module/user/user.service';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { UserLoginResult } from 'types/user';
import { WsException } from '@nestjs/websockets';
import { User } from '@/common/module/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<UserStatusDTO> {
    const username = loginUserDto.username;
    const password = loginUserDto.password;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      throw new UnauthorizedException('用户名或密码不能为空');
    }
    const user = await this.userService.findLoginUser(username);
    if (_.isEmpty(user)) {
      throw new UnauthorizedException('用户不存在');
    }
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new UnauthorizedException('账号或密码错误');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.user_type,
    };
  }

  async verifyJwt(jwt: string) {
    return await this.jwtService.verifyAsync(jwt);
  }

  async login(userInfo: UserStatusDTO): Promise<UserLoginResult> {
    const token = this.createToken(userInfo);
    return {
      userInfo,
      token,
    };
  }

  createToken({ username, id, role }: UserStatusDTO) {
    const value = this.jwtService.sign({ username, id, role });
    const expires = this.configService.get('JWT_EXPIRE');
    return {
      value,
      expires,
    };
  }
  async verify(token: string, isWs: boolean = false): Promise<User | null> {
    try {
      const payload = await this.verifyJwt(token);
      const user = await this.userService.findOneById(payload.id);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return user;
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
