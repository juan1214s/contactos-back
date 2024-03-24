import { Module } from '@nestjs/common';
import { ContactosController } from './contactos.controller';
import { ContactosService } from './contactos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contactos } from './entity/contactos.entity';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Contactos, Usuario]), LoginModule],
  controllers: [ContactosController],
  providers: [ContactosService]
})
export class ContactosModule {}
