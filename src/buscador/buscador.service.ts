import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contactos } from 'src/contactos/entity/contactos.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class BuscadorService {
    
    constructor(@InjectRepository(Contactos) private contactosRepository: Repository<Contactos> ){}

    async buscarContacto(id: number, nombre: string){

        if (!id) {
            throw new HttpException('No se proporcionó un ID de usuario', HttpStatus.BAD_REQUEST);
        }


        const buscar = await this.contactosRepository.find({
            where: {
                usuario: { id: id },
                nombre: Like(`%${nombre}%`) 
            }
        });

        if (buscar.length === 0) {
            throw new HttpException('No se encontraron contactos que coincidan con la búsqueda', HttpStatus.NOT_FOUND);
        }

        return buscar;
    };


}
