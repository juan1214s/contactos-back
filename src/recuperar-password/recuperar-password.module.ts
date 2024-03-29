import { Module } from '@nestjs/common';
import { RecuperarPasswordService } from './recuperar-password.service';
import { RecuperarPasswordController } from './recuperar-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entiy/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [RecuperarPasswordService],
  controllers: [RecuperarPasswordController]
})
export class RecuperarPasswordModule {}
