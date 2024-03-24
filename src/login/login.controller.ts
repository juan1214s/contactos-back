import { Body, Controller, Post, Req } from '@nestjs/common';
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

    //el token llega del front pero lo separo porq viene unido en una cadena de texto, viene en el header de la peticion y busco la propiedad q es authorization
    @Post('refresh')
    refreshToken(@Req() request: Request){
        //aca separo la cadena de texto en dos, y me quedo con el token
        const [type, token] = request.headers['authorization']?.split(' ') || []
        return  this.loginService.refreshToken(token);

    }
}

