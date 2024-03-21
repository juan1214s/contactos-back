import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contactos } from './entity/contactos.entity';
import { Repository } from 'typeorm';
import { ContactoDto } from './Dto/types.contactos';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';


@Injectable()
export class ContactosService {

    constructor(
        @InjectRepository(Contactos ) private contactosRepository: Repository<Contactos>,
        @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>
        ){}

    async crearContactos(id: number, contacto: ContactoDto) {
        try {
            
            const usuarioExiste = await this.usuariosRepository.findOne({
                where: {
                    id
                }
            })

            if (!usuarioExiste) {
                throw new HttpException('El usuario no fue encontrado', HttpStatus.NOT_FOUND)
            }


            if (contacto.nombre === undefined ) {
                throw new Error('El nombre del contacto no puede ser indefinido o nulo');
            }
    
            const contactoNuevo = this.contactosRepository.create(contacto);
            return await this.contactosRepository.save(contactoNuevo);
        } catch (error) {
            throw new Error(`Error al intentar crear el contacto: ${error.message}`);
        }
    }

    async actualizarContacto(id: number, contacto: ContactoDto) {
        try {
            const existeContacto = await this.contactosRepository.findOne({ where: { id } });
    
            if (!existeContacto) {
                throw new HttpException('El contacto que intenta actualizar no existe', HttpStatus.NOT_FOUND);
            }
    
            existeContacto.nombre = contacto.nombre
            existeContacto.numero = contacto.numero
            existeContacto.correoElectronico = contacto.correoElectronico
    
            await this.contactosRepository.save(existeContacto);
    
            return existeContacto; 
        } catch (error) {
            throw new Error(`Error al intentar actualizar el contacto: ${error.message}`);
        }
    }
}
