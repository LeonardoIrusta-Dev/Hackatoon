import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from '../utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<any> {
    const user = await this.userService.findEntityByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User not exist');
    }

    if (!user.credenciales) {
      throw new BadRequestException('Incorrect email or password');
    }

    const isValid = await comparePassword(data.password, user.credenciales);

    if (!isValid) {
      throw new BadRequestException('Incorrect email or password');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.mail,
    });

    return {
      token,
      id: user.id,
      email: user.mail,
    };
  }
}
