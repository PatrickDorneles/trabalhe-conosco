import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { GetUserService } from 'src/user/services/get-user/get-user.service';
import { SigninInputDTO } from '../../dtos/signin-input.dto';
import { InvalidCredentialsException } from 'src/auth/errors/invalid-credentials.exception';

@Injectable()
export class SigninService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService,
  ) { }

  async execute(dto: SigninInputDTO) {
    const user = await this.getUserService
      .getByEmail(dto.email)
      .catch(() => undefined);

    if (!user) {
      throw new InvalidCredentialsException()
    }

    const passwordMatch = await compare(dto.password, user.passwordHash);

    if (!passwordMatch) {
      throw new InvalidCredentialsException()
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken: token };
  }
}
