import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '@/auth/auth.controller';
import { SignupService } from '@/auth/services/signup/signup.service';
import { SigninService } from '@/auth/services/signin/signin.service';
import { GetAuthenticatedUserService } from '@/auth/services/get-authenticated-user/get-authenticated-user.service';
import { UserModule } from '@/user/user.module';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [SignupService, SigninService, GetAuthenticatedUserService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
