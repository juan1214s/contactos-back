import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entiy/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './Dto/types.usuarios';
import * as nodemailer from 'nodemailer';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsuariosService {
    private transporter;

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    ) {
        // Configuración del transporter de Nodemailer
        this.transporter = nodemailer.createTransport({
            // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
            service: 'Gmail',
            auth: {
                user: 'alzatejuan1980@gmail.com',
                pass: 'zdntlhytdwfqhaue',
            },
        });
    }

    async crearUsuario(usuario: UsuarioDto) {
        const usuarioDuplicado = await this.usuarioRepository.findOne({
            where: {
                correoElectronico: usuario.correoElectronico,
            },
        });

        if (usuarioDuplicado) {
            throw new HttpException('El correo ya está registrado', HttpStatus.CONFLICT);
        }

        try {
            const saltRounds = 5; 
            const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);

            const nuevoUsuario = new Usuario()
            nuevoUsuario.nombre = usuario.nombre;
            nuevoUsuario.apellido = usuario.apellido;
            nuevoUsuario.correoElectronico = usuario.correoElectronico;
            nuevoUsuario.password = hashedPassword;

            await this.usuarioRepository.save(nuevoUsuario);

            const mailOptions = {
                from: '',
                to: nuevoUsuario.correoElectronico,
                subject: 'Confirmación de registro',
                text: '¡Gracias por registrarte en nuestra aplicación!',
            };

            await this.transporter.sendMail(mailOptions);

            return { mensaje: 'Usuario creado con exito!'};
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    async eliminarUsuario(id: number) {
        try {
            const usuarioExiste = await this.usuarioRepository.delete(id);

            if (usuarioExiste.affected === 0) {
                throw new HttpException('El usuario que intentas eliminar no existe', HttpStatus.NOT_FOUND);
            }

            return { mensaje: 'Usuario eliminado exitosamente' };
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }
}
