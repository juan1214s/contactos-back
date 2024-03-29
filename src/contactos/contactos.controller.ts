import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactoDto } from './Dto/types.contactos';
import { ApiBearerAuth } from "@nestjs/swagger"
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@ApiBearerAuth()
//esto verifica q el usuario si este logeado
@UseGuards(JwtAuthGuard)
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

    
    @Get(':usuarioId')
    contactos(@Param('usuarioId', ParseIntPipe) id: number){
        return this.contactosService.contactos(id);
    }

    
    @Delete(':id')
    eliminarContacto(@Param('id', ParseIntPipe) id: number){
        return this.contactosService.eliminarContacto(id)
    }


}
