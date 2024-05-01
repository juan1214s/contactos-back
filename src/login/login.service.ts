import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from "dotenv";


dotenv.config();

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario) private loginRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async loginUsuario(correoElectronico: string, password: string) {
    try {
    const usuario = await this.loginRepository.findOne({
        where: {
        correoElectronico,
        },
    });

    if (!usuario) {
        throw new HttpException(
        'El correo electrónico o la contraseña son incorrectos',
        HttpStatus.UNAUTHORIZED,
    );
    }

    //compara la contraseña de la base de datos con la q ingresa el usuario
    const passwordValido = await bcrypt.compare(
        password,
        usuario.password,
    );

    if (!passwordValido) {
        throw new HttpException(
        'El correo electrónico o la contraseña son incorrectos',
        HttpStatus.UNAUTHORIZED,
        );
    }

    //estructura del token 
    const payload = {
        sub: usuario.id,
        correoElectronico: usuario.correoElectronico,
        nombre: usuario.nombre,
    };

    //esto firma el token
    const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TOKEN,//es la clave privada
        expiresIn: '40m' //es la duracion del token
    });
        
    const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TOKEN_REFRESH,
        expiresIn: '7d'
    });

    return {
        //devuelve los dos token
        access_token: accessToken,
        refresh_token: refreshToken,
        idUsuario: usuario.id,
        message: 'Token generado exitosamente'
        };
    } catch (error) {
    throw new HttpException(
        'Error en la autenticación',
        HttpStatus.UNAUTHORIZED,
        );
    }
}

//aca el fron devuelve el token y ve si es valido 
async refreshToken(refreshToken: string){
    try {
        //verifica el token q pasa el usuario con el q esta almacenado
        const usuario = this.jwtService.verify(refreshToken, {secret: process.env.JWT_TOKEN_REFRESH});

        //es la estructura
        const payload = {
            sub: usuario.id,
            correoElectronico: usuario.correoElectronico,
            nombre: usuario.nombre,
        }
        const { access_token, refresh_token } = await this.generarToken(payload);

        return {
            access_token,
            refresh_token,
            status: HttpStatus.CREATED,
            message: 'El token es valido'
        }
        
    } catch (error) {
        throw new HttpException(
            'El refresh token no es valido',
            HttpStatus.UNAUTHORIZED,
            );
    }
}

private async generarToken(usuario){

    //estructura del token 
    const jwtPayload = {
        sub: usuario.id,
        correoElectronico: usuario.correoElectronico,
        nombre: usuario.nombre,
    }

    
    const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
            secret: process.env.JWT_TOKEN,//es la clave privada
            expiresIn: '1d' //es la duracion del token
        }),

        this.jwtService.signAsync(jwtPayload, {
            secret: process.env.JWT_TOKEN_REFRESH,
            expiresIn: '7d'
        }),
    ])

    return {
        //devuelve los tokens
        access_token: accessToken,
        refresh_token: refreshToken
    }
}


}
