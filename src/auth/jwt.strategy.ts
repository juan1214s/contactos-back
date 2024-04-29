import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            //desestructura el token 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,//perimite q el token almacenado caduque
            secretOrKey: process.env.JWT_TOKEN
        });
    }

    async validate(payload: any) {
        return { id: payload.id, nombre: payload.nombre, correo: payload.correoElectronico };
    }
}
