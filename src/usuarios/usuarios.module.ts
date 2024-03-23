import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entiy/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ Usuario, LoginModule ])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
