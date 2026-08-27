import { BadRequestException } from "@nestjs/common";

export class UserEmailAlreadyInUseException extends BadRequestException {
  constructor() {
    super('auth.user-email-already-in-use')
  }
}
