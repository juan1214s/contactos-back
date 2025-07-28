import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const availablePorts = [3000, 4000, 3500];
  let selectedPort: number | undefined;

  for (const port of availablePorts) {
    try {
      const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'verbose', 'debug'] });

      // Configurar CORS globalmente
      app.enableCors({
        origin: [
          'http://localhost:4200',
          'http://192.168.1.16:4200',
          'http://localhost:4200/login',
          'http://localhost:4200/usuario',
          // ¡IMPORTANTE! Agrega la IP pública de tu VPS para el frontend
          // para que el frontend pueda comunicarse con el backend una vez que ambos estén en el VPS
          'http://31.97.103.226:4200' // <--- ¡Asegúrate de agregar esta línea!
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
      });

      // ¡CAMBIO CLAVE AQUÍ! Especifica '0.0.0.0' para escuchar en todas las interfaces
      await app.listen(port, '0.0.0.0'); // <--- ¡Modifica esta línea!
      selectedPort = port;
      console.log(`Backend escuchando en http://0.0.0.0:${port}`); // Mensaje para verificar el puerto
      break; // Salir del bucle una vez que se inicie correctamente
    } catch (err) {
      console.log(`El puerto ${port} ya está en uso. Intentando con el siguiente.`);
      // Puedes agregar más detalle del error si lo necesitas: console.error(`Error en puerto ${port}:`, err.message);
    }
  }

  if (!selectedPort) {
    throw new Error('No hay puertos disponibles en este servidor para la aplicación.');
  }

  console.log(`Aplicación NestJS iniciada en el puerto ${selectedPort}`);
}

bootstrap();