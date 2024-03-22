import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './Dto/login.type';

@Controller('login')
export class LoginController {

    constructor(private loginService: LoginService){}

    @Post()
    login(@Body() login: LoginDto){
        const { correoElectronico, password} = login

        return this.loginService.loginUsuario( correoElectronico, password );
    };

}
