import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactosModule } from './contactos/contactos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import * as dotenv from "dotenv"
import { Usuario } from './usuarios/entiy/usuario.entity';
import { BuscadorModule } from './buscador/buscador.module';
import { Contactos } from './contactos/entity/contactos.entity';
import { LoginModule } from './login/login.module';

dotenv.config();

@Module({
  imports: [ ContactosModule, UsuariosModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Usuario, Contactos ],
      synchronize: true 
    }),
    BuscadorModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
