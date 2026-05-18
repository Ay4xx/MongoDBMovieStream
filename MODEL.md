# Modelo documental de MovieStream en MongoDB

## 1. Introducción

Este proyecto toma el dominio de MovieStream, originalmente modelado de forma relacional en Oracle, y lo adapta a un modelo documental usando MongoDB. En el modelo relacional, entidades como películas, géneros, actores, usuarios, vistas y ratings normalmente se conectan mediante llaves foráneas y tablas intermedias para resolver relaciones muchos-a-muchos.

En MongoDB, el objetivo no es copiar exactamente el modelo relacional, sino rediseñarlo de acuerdo con la forma en que la aplicación va a consultar y modificar los datos. Por eso, algunas relaciones se mantienen por referencia y otras se embeben dentro de los documentos.

El modelo propuesto busca que las consultas principales de la app sean simples: listar películas, mostrar sus géneros y actores, consultar usuarios con sus interacciones, y permitir operaciones CRUD básicas.

---

## 2. Colecciones finales

El modelo queda compuesto por las siguientes colecciones:

1. `movies`
2. `genres`
3. `actors`
4. `users`

Aunque en el modelo relacional podrían existir tablas intermedias como `movie_genres`, `movie_actors`, `user_ratings` o `watch_history`, en MongoDB estas relaciones se resuelven principalmente mediante arreglos de referencias o documentos embebidos.

---

## 3. Colección `movies`

La colección `movies` representa las películas disponibles en MovieStream. Cada película contiene información básica, referencias a géneros y referencias a actores.

### Ejemplo de documento

```json
{
  "_id": "ObjectId",
  "title": "Neon City",
  "year": 2021,
  "durationMinutes": 118,
  "description": "A sci-fi thriller about a detective investigating a digital conspiracy.",
  "genres": [
    {
      "_id": "ObjectId",
      "name": "Sci-Fi"
    },
    {
      "_id": "ObjectId",
      "name": "Thriller"
    }
  ],
  "actors": [
    {
      "_id": "ObjectId",
      "name": "Luna Reyes",
      "role": "Detective Vega"
    },
    {
      "_id": "ObjectId",
      "name": "Marco Stone",
      "role": "Dr. Hale"
    }
  ],
  "ratingAverage": 4.5,
  "createdAt": "2026-05-17T00:00:00.000Z",
  "updatedAt": "2026-05-17T00:00:00.000Z"
}