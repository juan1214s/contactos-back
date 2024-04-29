import { Body, Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

//con esto especifico q la ruta esta protegida y se le debe pasar el token desde la peticion en el bearer
@UseGuards(JwtAuthGuard)
@Controller('buscador')
export class BuscadorController {

    constructor(private buscadorService: BuscadorService){}

    @Get(':id')
    async buscador(@Param('id', ParseIntPipe) id: number, @Query('nombre') nombre: string) {
      return this.buscadorService.buscarContacto(id, nombre);
    }
}
