import { Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BuscadorService } from './buscador.service';

@Controller('buscador')
export class BuscadorController {

    constructor(private BuscadorService: BuscadorService){}

    @Get(':id')
    buscador(@Param('id', ParseIntPipe) id: number , @Body('nombre') nombre: string){
        return this.BuscadorService.buscarContacto(id, nombre);
    }

}
