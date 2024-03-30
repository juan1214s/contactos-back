import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const availablePorts = [3000, 4000, 3500];
  let selectedPort: number | undefined;

  for (const port of availablePorts) {
    try {
      const app = await NestFactory.create(AppModule, { logger: false });

      // Configurar CORS globalmente
      app.enableCors({
        origin: ['http://localhost:4200',
         'http://localhost:4200/login',
         'http://localhost:4200/usuario'
        
        ], // Permitir solicitudes desde estos orígenes
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir estos métodos HTTP
        allowedHeaders: 'Content-Type,Authorization', // Permitir estas cabeceras en las solicitudes
        credentials: true, // Permitir enviar cookies de autenticación
      });

      await app.listen(port);
      selectedPort = port;
      break;
    } catch (err) {
      // El puerto ya está en uso, intenta con el siguiente puerto
      console.log(`El puerto ${port} ya está en uso`);
    }
  }

  if (!selectedPort) {
    throw new Error('No hay puertos disponibles');
  }

  console.log(`Aplicación escuchando en el puerto ${selectedPort}`);
}

bootstrap();
