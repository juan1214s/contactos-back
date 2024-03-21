import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './Dto/types.usuarios';

@Controller('usuarios')
export class UsuariosController {

    constructor(private UsuariosService: UsuariosService){}

    @Post()
    crearUsuario(@Body() usuario: UsuarioDto){
        return this.UsuariosService.crearUsuario(usuario);
    }

    @Delete(':id')
    eliminarUsuario(@Param('id', ParseIntPipe) id: number){
        return this.UsuariosService.eliminarUsuario(id)
    }
}
