import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RecuperarPasswordService } from './recuperar-password.service';
import { RecuperarPasswordDto } from './Dto/recuperar-password.type';

@Controller('recuperar-password')
export class RecuperarPasswordController {
    constructor(
        private recuperarPasswordSercvice: RecuperarPasswordService
    ){}

    @Patch()
    ObtenerCorreo(@Body() data: RecuperarPasswordDto){
        const { correoElectronico, password } = data
        return this.recuperarPasswordSercvice.ObtenerCorreo(correoElectronico, password)
    }
}
