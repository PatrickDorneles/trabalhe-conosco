import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupService } from '@/auth/services/signup/signup.service';
import { SigninService } from '@/auth/services/signin/signin.service';
import { SignupInputDTO } from '@/auth/dtos/signup-input.dto';
import { SigninInputDTO } from '@/auth/dtos/signin-input.dto';
import { SigninOutputDTO } from '@/auth/dtos/signin-output.dto';
import { UserOutput } from '@/user/dtos/user-output.dto';
import { IsPublic } from '@/shared/decorators/is-public/is-public.decorator';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
  ) { }

  @Post('signup')
  @IsPublic()
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserOutput })
  @ApiResponse({ status: 400, description: 'E-mail já cadastrado' })
  async signup(@Body() dto: SignupInputDTO): Promise<UserOutput> {
    return this.signupService.execute(dto);
  }

  @Post('signin')
  @IsPublic()
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: SigninOutputDTO })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async signin(@Body() dto: SigninInputDTO): Promise<SigninOutputDTO> {
    return this.signinService.execute(dto);
  }
}
