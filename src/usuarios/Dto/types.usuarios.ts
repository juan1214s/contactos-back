import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UsuarioDto{
    @IsString()
    readonly nombre: string

    @IsString()
    readonly apellido: string

    @IsEmail()
    readonly correoElectronico: string

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string

    
}