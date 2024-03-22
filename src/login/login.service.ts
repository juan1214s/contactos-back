import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"


@Injectable()
export class LoginService {

    constructor( @InjectRepository(Usuario) private loginRepository: Repository<Usuario>){}

   async loginUsuario( correoElectronico: string, password: string){
        try {
             const existeUsuario = await this.loginRepository.findOne({  
               where: {
                correoElectronico
               }
             });

             const passwordValido = await bcrypt.compare(password, existeUsuario.password);

             if (!passwordValido) {
                throw new HttpException('No tienes autorizacion', HttpStatus.UNAUTHORIZED);
             }

             if (existeUsuario && passwordValido) {
                const { correoElectronico, nombre } = existeUsuario;
                return { correoElectronico, nombre };
             }

        } catch (error) {
            throw new HttpException('No tienes autorizacion', HttpStatus.UNAUTHORIZED);
        }
       

      
    }
}
