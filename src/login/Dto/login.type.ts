import { IsString } from "class-validator"

export class LoginDto{
    
    @IsString()
    correoElectronico: string 

    @IsString()
    password: string
}

export class Tokens{
    @IsString()
    access_token: string

    @IsString()
    refresh_token: string

}