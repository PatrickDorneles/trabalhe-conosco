import { BadRequestException } from "@nestjs/common";

export class UserEmailAlreadyClaimedException extends BadRequestException {
  constructor() {
    super('auth.user-email-already-claimed')
  }
}
