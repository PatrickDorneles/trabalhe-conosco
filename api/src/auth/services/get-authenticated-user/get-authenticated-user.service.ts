import { Injectable, Logger } from '@nestjs/common';
import { GetUserService } from '@/user/services/get-user/get-user.service';

@Injectable()
export class GetAuthenticatedUserService {
  private readonly logger = new Logger(GetAuthenticatedUserService.name)

  constructor(
    private readonly getUserService: GetUserService,
  ) { }

  async execute(id: string) {
    this.logger.log(`Fetching authenticated user: ${id}`)

    return this.getUserService.getById(id)
  }
}
