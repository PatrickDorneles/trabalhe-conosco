import { UnauthorizedException } from "@nestjs/common";

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('auth.invalid-credentials')
  }
}
