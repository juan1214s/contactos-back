import { IsEmail, IsNumber, IsString } from "class-validator"

export class ContactoDto{
    @IsNumber()
    usuarioId?: number

    @IsString()
    nombre: string

    @IsString()
    numero: number

    @IsEmail()
    correoElectronico?: string
   
}