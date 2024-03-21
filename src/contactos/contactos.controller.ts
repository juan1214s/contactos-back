import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactoDto } from './Dto/types.contactos';

@Controller('contactos')
export class ContactosController {

    constructor(private contactosService: ContactosService){}
    @Post(':id')
    async crearContactos(@Param('id', ParseIntPipe) id: number, @Body() contacto: ContactoDto) {
        return this.contactosService.crearContactos(id, contacto);
    }

    @Patch(':id')
    actualizarContacto(@Param('id', ParseIntPipe) id: number, @Body() contacto: ContactoDto){
        return this.contactosService.actualizarContacto(id, contacto)
    }
}
