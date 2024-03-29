import { IsEmail, IsString } from "class-validator";

export class RecuperarPasswordDto{
    @IsEmail()
    correoElectronico: string

    @IsString()
    password: string
}


export class PasswordDto{
    @IsString()
    password: string
}
