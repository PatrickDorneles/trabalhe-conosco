import { Injectable, Logger } from '@nestjs/common';
import { CreateUserService } from 'src/user/services/create-user/create-user.service';
import { SignupInputDTO } from '../../dtos/signup-input.dto';
import { GetUserService } from 'src/user/services/get-user/get-user.service';
import { UserEmailAlreadyInUseException } from 'src/auth/errors/user-email-already-in-use.exception';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name)

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) { }

  public async execute(dto: SignupInputDTO) {
    this.logger.log(`Attempting to create account with email: ${dto.email}`)
    const userWithSameEmail = await this.getUserService.getByEmail(dto.email).catch(() => undefined)

    if (userWithSameEmail) {
      this.logger.error(`Email (${dto.email}) already in use, by user: ${userWithSameEmail.id}`)
      throw new UserEmailAlreadyInUseException()
    }

    const user = await this.createUserService.createUser(dto);

    this.logger.log(`User account (${dto.email}) created successfully`)

    return user
  }
}
