import { IsString } from "class-validator"

export class LoginDto{
    
    @IsString()
    correoElectronico: string 

    @IsString()
    password: string
}