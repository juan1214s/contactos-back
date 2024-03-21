import { Module } from '@nestjs/common';
import { BuscadorController } from './buscador.controller';
import { BuscadorService } from './buscador.service';

@Module({
  controllers: [BuscadorController],
  providers: [BuscadorService]
})
export class BuscadorModule {}
