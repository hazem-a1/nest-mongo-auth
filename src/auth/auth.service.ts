import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Wrong Credentials');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong Credentials');
    }
    return user;
  }

  async login(user: UserDocument): Promise<AccessToken> {
    const payload = { email: user.email, id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('Wrong Credentials');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const result = await this.usersService.create(newUser);
    return this.login(result);
  }
}
