import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
