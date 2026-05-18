# MovieStream MongoDB

## Descripción del proyecto

MovieStream MongoDB es una aplicación web simple desarrollada para transformar un modelo relacional de películas a un modelo documental usando MongoDB. El objetivo principal del proyecto es practicar el diseño de bases de datos NoSQL, tomando decisiones sobre cuándo embeber información y cuándo referenciar documentos.

La aplicación permite interactuar con una base de datos de películas, géneros, actores y usuarios. A través de la interfaz web se pueden realizar operaciones CRUD sobre películas y géneros, incluyendo la creación de películas con géneros y actores relacionados.

Este proyecto forma parte de una actividad académica en la que se pide traducir el dominio MovieStream desde un modelo relacional a MongoDB, poblar la base de datos, construir una app web funcional, publicarla y reflexionar sobre las decisiones de modelado tomadas durante la implementación.

## Funcionalidades principales

La aplicación permite:

- Listar películas registradas en la base de datos.
- Buscar películas por título, género o actor.
- Crear nuevas películas.
- Editar películas existentes.
- Eliminar películas.
- Listar géneros.
- Buscar géneros.
- Crear nuevos géneros.
- Editar géneros existentes.
- Eliminar géneros cuando no estén siendo utilizados por películas.

Una parte importante de la aplicación es que la colección `movies` guarda información relacionada con géneros y actores. Esto permite observar directamente las decisiones de modelado documental, especialmente el uso de datos embebidos y referencias.

## Stack utilizado

El proyecto fue desarrollado con el siguiente stack:

- **Node.js**: entorno de ejecución para JavaScript en el backend.
- **Express.js**: framework para crear el servidor web y las rutas de la aplicación.
- **MongoDB Atlas**: base de datos NoSQL en la nube.
- **MongoDB Driver para Node.js**: conexión directa con MongoDB sin utilizar Mongoose.
- **EJS**: motor de plantillas para renderizar vistas HTML desde el servidor.
- **method-override**: paquete utilizado para permitir métodos PUT y DELETE desde formularios HTML.
- **dotenv**: manejo de variables de entorno.
- **CSS**: estilos básicos para la interfaz.

Se eligió este stack porque permite construir una aplicación funcional de manera sencilla, sin agregar demasiada complejidad al frontend. Además, Express y EJS hacen más fácil enfocarse en el objetivo principal de la actividad: interactuar con el modelo documental en MongoDB.

## Modelo de datos

La base de datos se llama:

```txt
moviestream
```

Y contiene las siguientes colecciones:

```txt
movies
genres
actors
users
```

### Colección `movies`

La colección `movies` almacena las películas. Cada película contiene información básica y arreglos embebidos con datos resumidos de géneros y actores.

Ejemplo de estructura:

```js
{
  title: "Neon City",
  year: 2021,
  durationMinutes: 118,
  description: "A detective investigates a digital conspiracy in a futuristic city.",
  genres: [
    {
      _id: ObjectId,
      name: "Sci-Fi"
    }
  ],
  actors: [
    {
      _id: ObjectId,
      name: "Luna Reyes",
      role: "Detective Vega"
    }
  ],
  ratingAverage: 4.5,
  createdAt: Date,
  updatedAt: Date
}
```

### Colección `genres`

La colección `genres` almacena los géneros disponibles para clasificar películas.

```js
{
  name: "Action",
  description: "Movies with intense sequences, fights, and chases.",
  createdAt: Date,
  updatedAt: Date
}
```

### Colección `actors`

La colección `actors` almacena los actores disponibles.

```js
{
  name: "Luna Reyes",
  birthYear: 1992,
  nationality: "Mexico",
  createdAt: Date,
  updatedAt: Date
}
```

### Colección `users`

La colección `users` almacena usuarios con interacciones embebidas, como historial de vistas y ratings.

```js
{
  name: "Ana Torres",
  email: "ana.torres@example.com",
  watchHistory: [
    {
      movieId: ObjectId,
      movieTitle: "Neon City",
      watchedAt: Date
    }
  ],
  ratings: [
    {
      movieId: ObjectId,
      movieTitle: "Neon City",
      score: 5,
      ratedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Decisiones de modelado

En este proyecto se utilizó una combinación de referencias y datos embebidos.

En la colección `movies`, los géneros y actores se guardan como arreglos embebidos con información resumida. Esto permite listar películas junto con sus géneros y actores sin tener que hacer consultas adicionales. Esta decisión facilita la lectura de datos en la interfaz.

Los géneros y actores también se mantienen como colecciones separadas porque deben poder administrarse de forma independiente. Por ejemplo, la app permite crear, editar y eliminar géneros.

En el caso de los usuarios, las interacciones como `watchHistory` y `ratings` se embeben dentro del documento del usuario, porque normalmente se consultan desde la perspectiva del usuario.

Esta estructura evita usar tablas intermedias como en un modelo relacional y permite representar relaciones muchos-a-muchos mediante arreglos dentro de los documentos.

## Requisitos previos

Antes de correr el proyecto, se necesita tener instalado:

```txt
Node.js
npm
Cuenta o cluster de MongoDB Atlas
```

También se puede utilizar MongoDB local si se prefiere.

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd mongoMovieStream
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=moviestream
PORT=3000
```

Por seguridad, el archivo `.env` no debe subirse al repositorio.

## Variables de entorno

El proyecto utiliza las siguientes variables:

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas o MongoDB local |
| `DB_NAME` | Nombre de la base de datos |
| `PORT` | Puerto donde corre la aplicación |

Ejemplo para MongoDB local:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=moviestream
PORT=3000
```

## Poblar la base de datos

El proyecto incluye un script de seed que elimina los datos anteriores y vuelve a crear la base con datos de prueba.

Para correr el seed:

```bash
npm run seed
```

El seed crea:

```txt
20 películas
5 géneros
10 actores
15 usuarios con interacciones
```

Si el seed corre correctamente, debería aparecer un mensaje similar a:

```txt
Connected to MongoDB
Previous data deleted
Seed completed successfully
Genres: 5
Actors: 10
Movies: 20
Users: 15
```

## Correr la aplicación localmente

Después de instalar dependencias y correr el seed, iniciar la aplicación con:

```bash
npm run dev
```

O también:

```bash
npm start
```

Luego abrir en el navegador:

```txt
http://localhost:3000
```

## Scripts disponibles

```json
{
  "start": "node app.js",
  "dev": "node app.js",
  "seed": "node scripts/seed.js"
}
```

## Estructura del proyecto

```txt
mongoMovieStream/
├─ config/
│  └─ db.js
├─ routes/
│  ├─ movie.routes.js
│  └─ genre.routes.js
├─ scripts/
│  └─ seed.js
├─ views/
│  ├─ index.ejs
│  ├─ movies/
│  │  ├─ index.ejs
│  │  ├─ new.ejs
│  │  └─ edit.ejs
│  └─ genres/
│     ├─ index.ejs
│     ├─ new.ejs
│     └─ edit.ejs
├─ public/
│  └─ styles.css
├─ .env.example
├─ .gitignore
├─ app.js
├─ MODEL.md
├─ REFLECTION.md
├─ package.json
└─ README.md
```

## Deployment

La aplicación está pensada para publicarse en un servicio gratuito como Render, Railway, Vercel o similares.

URL pública de la aplicación:

```txt
PENDIENTE_AGREGAR_URL_DEL_DEPLOYMENT
```

Antes de entregar, se debe verificar que la URL funcione correctamente desde una ventana de incógnito.

En el servicio de deployment se deben configurar las mismas variables de entorno:

```env
MONGODB_URI=...
DB_NAME=moviestream
PORT=3000
```

## Archivos principales de entrega

El repositorio incluye los archivos solicitados para la actividad:

- `MODEL.md`: explicación del modelo documental y decisiones de diseño.
- `scripts/seed.js`: script para recrear la base de datos desde cero.
- Aplicación web con CRUD sobre `movies` y `genres`.
- `README.md`: instrucciones para correr el proyecto.
- `REFLECTION.md`: reflexión sobre el proceso de modelado e implementación.

## Estado actual del proyecto

Actualmente el proyecto cuenta con:

- Modelo documental propuesto.
- Seed funcional con datos de prueba.
- Conexión a MongoDB usando el driver oficial de Node.js.
- CRUD de películas.
- CRUD de géneros.
- Interfaz web simple con EJS.
- Preparación para deployment.

La reflexión final se agregará en el archivo `REFLECTION.md`.
