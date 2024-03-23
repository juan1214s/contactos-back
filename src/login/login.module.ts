import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [LoginService, JwtService],
  controllers: [LoginController]
})
export class LoginModule {}
