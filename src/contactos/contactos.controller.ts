import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactoDto } from './Dto/types.contactos';

@Controller('contactos')
export class ContactosController {

    constructor(private contactosService: ContactosService){}
    @Post(':usuarioId')
    async crearContactos(@Param('usuarioId', ParseIntPipe) id: number, @Body() contacto: ContactoDto) {
        return this.contactosService.crearContactos(id, contacto);
    }

    @Patch(':id')
    actualizarContacto(@Param('id', ParseIntPipe) id: number, @Body() contacto: ContactoDto){
        return this.contactosService.actualizarContacto(id, contacto)
    }

    @Get()
    contactos(){
        return this.contactosService.contactos();
    }

    @Delete(':id')
    eliminarContacto(@Param('id', ParseIntPipe) id: number){
        return this.contactosService.eliminarContacto(id)
    }


}
