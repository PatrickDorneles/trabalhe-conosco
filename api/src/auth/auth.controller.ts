import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupService } from './services/signup/signup.service';
import { SigninService } from './services/signin/signin.service';
import { SignupInputDTO } from './dtos/signup-input.dto';
import { SigninInputDTO } from './dtos/signin-input.dto';
import { SigninOutputDTO } from './dtos/signin-output.dto';
import { UserOutput } from '../user/dtos/user-output.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
  ) { }

  @Post('signup')
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserOutput })
  @ApiResponse({ status: 400, description: 'E-mail já cadastrado' })
  async signup(@Body() dto: SignupInputDTO): Promise<UserOutput> {
    return this.signupService.execute(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: SigninOutputDTO })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async signin(@Body() dto: SigninInputDTO): Promise<SigninOutputDTO> {
    return this.signinService.execute(dto);
  }
}
