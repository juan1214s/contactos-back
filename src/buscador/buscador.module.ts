import { Module } from '@nestjs/common';
import { BuscadorController } from './buscador.controller';
import { BuscadorService } from './buscador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contactos } from 'src/contactos/entity/contactos.entity';
import { LoginModule } from 'src/login/login.module';


@Module({
  imports: [TypeOrmModule.forFeature([Contactos]), LoginModule],
  controllers: [BuscadorController],
  providers: [BuscadorService]
})
export class BuscadorModule {}
