# Contactos-Back

**Contactos-Back** es un backend desarrollado con **NestJS** que proporciona un servicio robusto para la gestión de contactos. Utiliza **TypeORM** para la sincronización automática de la base de datos, **MySQL2** como motor de base de datos, y **JWT** para la autenticación segura con rutas protegidas. Además, **Nodemailer** se utiliza para la recuperación de contraseñas.

## Características

- **JWT y Rutas Protegidas**: Implementa JWT para autenticación y autorización con rutas protegidas.
- **JWT Refresh**: Soporte para tokens de actualización.
- **Recuperación de Contraseña**: Utiliza **Nodemailer** para el envío de correos electrónicos para la recuperación de contraseñas.
- **TypeORM**: Manejo de la base de datos con sincronización automática de cambios.
- **MySQL2**: Motor de base de datos.
- **TypeScript**: Lenguaje de programación utilizado.
- **bcrypt**: Para el hash seguro de contraseñas.

## Rutas Disponibles

- **/usuarios**
  - `POST /usuarios`: Crear un nuevo usuario.
  - `DELETE /usuarios/:id`: Eliminar un usuario específico por su ID.
- **/recuperar-password**
  - `POST /recuperar-password`: Recuperar la contraseña mediante correo electrónico.
- **/login**
  - `POST /login`: Iniciar sesión con correo electrónico y contraseña.
- **/contactos**
  - `GET /contactos/:id`: Obtener contactos del usuario especificado por ID.
  - `POST /contactos`: Crear un nuevo contacto.
  - `DELETE /contactos/:id`: Eliminar un contacto específico por su ID.
  - `PATCH /contactos/:id`: Actualizar un contacto existente (similar a PUT).
- **/buscador**
  - `GET /buscador/:id/:nombre`: Buscar contactos del usuario especificado por ID y nombre del contacto.

Cada ruta tiene su propio modelo o tipado definido con **TypeScript** para una integración segura y tipada.

## Tecnologías Utilizadas

- **NestJS**: Framework para construir aplicaciones del lado del servidor.
- **TypeORM**: ORM para manejar la base de datos.
- **MySQL2**: Motor de base de datos.
- **TypeScript**: Lenguaje de programación.
- **bcrypt**: Librería para el hash de contraseñas.
- **Nodemailer**: Para el envío de correos electrónicos.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/contactos-back.git
   
2.Accede al directorio del proyecto: cd contactos-back

3.Instala las dependencias necesarias: npm install

Configura las variables de entorno en un archivo .env con el siguiente contenido:
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=contact
JWT_TOKEN=tu clave secreta del token
JWT_TOKEN_REFRESH=JWT-TOKEN-REFRESH

**Inicia el servidor**
npm run start:dev

## Configuración de CORS

El backend permite solicitudes desde los siguientes orígenes:

- `http://localhost:4200`
- `http://192.168.1.16:4200`
- `http://localhost:4200/login`
- `http://localhost:4200/usuario`

Se permiten los siguientes métodos HTTP:

- `GET`
- `HEAD`
- `PUT`
- `PATCH`
- `POST`
- `DELETE`

Se permiten las siguientes cabeceras:

- `Content-Type`
- `Authorization`

Se permite el envío de cookies de autenticación.



