import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/user/services/create-user/create-user.service';
import { SignupInputDTO } from '../../dtos/signup-input.dto';
import { GetUserService } from 'src/user/services/get-user/get-user.service';
import { UserEmailAlreadyClaimedException } from 'src/auth/errors/user-email-already-claimed.exception';

@Injectable()
export class SignupService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) { }

  public async execute(dto: SignupInputDTO) {
    const userWithSameEmail = await this.getUserService.getByEmail(dto.email).catch(() => undefined)

    if (userWithSameEmail) {
      throw new UserEmailAlreadyClaimedException()
    }

    return this.createUserService.createUser(dto);
  }
}
