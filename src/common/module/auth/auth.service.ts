import { ConfigService } from '@nestjs/config';
import { UserStatusDTO } from '../user/dto/user-status.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@/common/module/user/dto/login-user.dto';
import { UserService } from '@/common/module/user/user.service';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { UserLoginResult } from 'types/user';

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

  verifyJwt(jwt: string) {
    return this.jwtService.verifyAsync(jwt);
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
}
