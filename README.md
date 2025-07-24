API de Blog Simple
Una API RESTful simple para un blog, que incluye autenticación de usuarios y caching con Redis para optimizar el rendimiento.

🚀 Características
Autenticación de Usuarios: Registro y login de usuarios con JWT (JSON Web Tokens).

Gestión de Posts:

Creación de nuevas publicaciones.

Obtención de todos los posts o de uno específico.

Búsqueda de posts más populares.

Actualización parcial de posts (PATCH).

Eliminación de posts.

Sistema de Visualizaciones: Cada vez que un post es visto por su ID, su contador de visualizaciones se incrementa, contribuyendo a la lógica de "posts más populares".

Posts Identificados por Usuario: Cada post creado está asociado directamente con el usuario que lo publicó.

Caching con Redis: Implementación de Redis para mejorar la velocidad de respuesta en la obtención de posts.

Validación de Datos: Uso de Zod para la validación de esquemas de datos.

Base de Datos Relacional: Persistencia de datos con MySQL y ORM Sequelize.

🛠️ Tecnologías Utilizadas
Node.js

Express.js: Framework web para Node.js.

Zod: Biblioteca para la declaración y validación de esquemas.

JSON Web Token (JWT): Para la autenticación de usuarios.

Redis: Base de datos en memoria utilizada para caching.

MySQL: Base de datos relacional.

Sequelize: ORM (Object-Relational Mapper) para MySQL.

Cookie-parser: Middleware para parsear cookies.

Bcrypt: Para el hashing seguro de contraseñas.

⚙️ Instalación y Configuración
Sigue estos pasos para poner en marcha la API en tu entorno local:

Clona el repositorio:

Bash

git clone https://github.com/Angelitoo777/API-de-blog-simple-/
cd API-de-blog-simple-
Instala las dependencias:

Bash

npm install
Configura tus variables de entorno:
Crea un archivo .env en la raíz del proyecto con tus credenciales y configuraciones. Aquí un ejemplo de las variables que podrías necesitar:

PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_blog_db
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_key
Asegúrate de reemplazar los valores de ejemplo con los tuyos.

Configura tu base de datos:
Asegúrate de tener un servidor MySQL en ejecución y crea una base de datos con el nombre que especificaste en MYSQL_DATABASE. Sequelize se encargará de las migraciones y la creación de tablas al inicializar la aplicación.

Inicia el servidor Redis:
Asegúrate de tener un servidor Redis en ejecución. Puedes descargarlo e instalarlo desde redis.io.

Inicializa la API:

Bash

npm run dev
La API estará corriendo en el puerto que hayas especificado en tu archivo .env (por defecto, 3000).

🗺️ Endpoints de la API
La API se divide en dos secciones principales: autenticación y gestión de posts.

Autenticación (/api/auth)
POST /api/auth/register: Registra un nuevo usuario.

Body: { "username": "string", "email": "string", "password": "string" }

POST /api/auth/login: Inicia sesión y devuelve un token JWT (en una cookie accessToken).

Body: { "username": "string", "password": "string" }

Posts (/api/post)
Para acceder a estos endpoints, el usuario debe estar autenticado (el JWT se envía automáticamente si la cookie accessToken está presente).

POST /api/post: Crea un nuevo post.

Body: { "title": "string", "content": "string" }

GET /api/post: Obtiene todos los posts (con caching de Redis).

GET /api/post/popular: Obtiene los posts más populares, basados en el número de visualizaciones.

GET /api/post/:id: Obtiene un post específico por su ID. Cada vez que este endpoint es accedido, la visualización del post se incrementa.

PATCH /api/post/:id: Actualiza parcialmente un post existente. Solo el usuario propietario del post puede realizar esta acción.

Body: { "title"?: "string", "content"?: "string" } (uno o ambos campos son opcionales)

DELETE /api/post/:id: Elimina un post. Solo el usuario propietario del post puede realizar esta acción.
