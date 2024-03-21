import { Module } from '@nestjs/common';
import { BuscadorController } from './buscador.controller';
import { BuscadorService } from './buscador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contactos } from 'src/contactos/entity/contactos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Contactos])],
  controllers: [BuscadorController],
  providers: [BuscadorService]
})
export class BuscadorModule {}
