import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as bcrypt from "bcrypt"

@Injectable()
export class RecuperarPasswordService {
    private transporter;

    constructor(
        @InjectRepository(Usuario)private usuarioReository: Repository<Usuario>
    ){
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

    async ObtenerCorreo(correo: string, password: string){
        try {
        const usuario = await this.usuarioReository.findOne({
            where: {
                correoElectronico: correo
            }
        })

        if(!usuario){
            throw new HttpException('El correo no esta registrado', HttpStatus.NOT_FOUND);
        }

        const saltRounds = 5; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        usuario.correoElectronico = correo
        usuario.password = hashedPassword

        await this.usuarioReository.save(usuario)

            const mailOptions = {
                from: '',
                to: usuario.correoElectronico,
                subject: 'Confirmación del cambio de su contraseña',
                text: `Esta es tu nueva contraseña ${password}`,
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new HttpException('Error en el servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}


